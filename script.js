let cityInput = document.querySelector("#cityInput");
let searchBtn = document.querySelector("#searchBtn");
let result = document.querySelector("#result");

// functions

async function searchHandler() {
  const city = cityInput.value.trim();
  if (city === "") {
    cityInput.value = "";
    cityInput.placeholder = "Enter Valid City";
    cityInput.classList.add("emptyCity");
    return;
  }
  result.textContent = "";
  cityInput.classList.remove("emptyCity");
  antiSpam(true);
  result.textContent = "Fetching fata Please Wait...";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e82c39ac97dae6f6977d113b0513e7a4`,
    );

    const data = await response.json();
    //data validation
    if (data.cod === 404) {
      result.textContent = "City Not Found";
    }
    result.textContent = `
    
    City: ${data.name}
    Weather:${data.weather[0].description}
    Temperature: ${data.main.temp}
    
    `;
    antiSpam(false);
  } catch (error) {
    result.textContent = "Something went Wrong";
  } finally {
    antiSpam(false);
  }
}

//anti spam

function antiSpam(isDisabled) {
  searchBtn.disabled = isDisabled;
  cityInput.disabled = isDisabled;
}

// event listeners
searchBtn.addEventListener("click", searchHandler);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
});
