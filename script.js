let cityInput = document.querySelector("#cityInput");
let searchBtn = document.querySelector("#searchBtn");
let result = document.querySelector("#result");
//elements
let cityName = document.querySelector("#city");
let weather = document.querySelector("#weather");
let temperature = document.querySelector("#temperature");
let weatherIcon = document.querySelector("#weatherIcon");

// functions

async function searchHandler() {
  const city = cityInput.value.trim();
  if (city === "") {
    cityInput.value = "";
    cityInput.placeholder = "Enter Valid City";
    cityInput.classList.add("emptyCity");
    return;
  }
  errorMessage(""); // here
  cityInput.classList.remove("emptyCity");
  antiSpam(true);
  loadingMessage();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e82c39ac97dae6f6977d113b0513e7a4`,
    );

    const data = await response.json();
    //data validation
    if (data.cod == 404) {
      errorMessage("City not Found"); //here
      return;
    }
    console.log(data);
    weatherData(data);
  } catch (error) {
    errorMessage("Something went Wrong"); // here
  } finally {
    antiSpam(false);
  }
}

//anti spam

function antiSpam(isDisabled) {
  searchBtn.disabled = isDisabled;
  cityInput.disabled = isDisabled;
}

//weather data
function weatherData(data) {
  cityName.textContent = data.name;
  weather.textContent = data.weather[0].description;
  temperature.textContent = data.main.temp + "°C";
  ///icon

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  console.log("ICON:", data.weather[0].icon);
}

//loading message
function loadingMessage() {
  cityName.textContent = "Fetching Data Please wait";
  weather.textContent = "";
  temperature.textContent = "";
}

//error message

function errorMessage(msg) {
  cityName.textContent = msg;
  weather.textContent = "";
  temperature.textContent = "";
}

// event listeners
searchBtn.addEventListener("click", searchHandler);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
});
