let cityInput = document.querySelector("#cityInput");
let searchBtn = document.querySelector("#searchBtn");
let result = document.querySelector("#result");

// functions

function searchHandler() {
  let city = cityInput.value.trim();
  if (city === "") {
    cityInput.value = "";
    cityInput.placeholder = " Please Enter a Valid City";
    cityInput.classList.add("emptyCity");
    result.textContent = "";
    return;
  }
  cityInput.classList.remove("emptyCity");
  cityInput.placeholder = "Enter City Name";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e82c39ac97dae6f6977d113b0513e7a4`,
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

//event handler

searchBtn.addEventListener("click", searchHandler);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
});
