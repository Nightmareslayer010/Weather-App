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
  result.textContent = city;
}

//event handler

searchBtn.addEventListener("click", searchHandler);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
});
