let cityInput = document.querySelector("#city-input");
let searchBtn = document.querySelector("#searchBtn");
//result elements
let cityName = document.querySelector("#city");
let temperature = document.querySelector("#temperature");
let weatherIcon = document.querySelector("#weatherIcon");
let weatherDescription = document.querySelector(".weather-description");
//styling toggle
let weatherCard = document.querySelector(".weather-card");

//function

async function searchHandler() {
  const city = cityInput.value.trim();
  if (city === "") {
    cityInput.value = "";
    weatherCard.classList.remove("active");
    cityInput.placeholder = "Enter Valid City";
    return;
  }
  weatherCard.classList.add("active");
  ErrorMsg("");
  antiSpam(true);
  loadingMessage();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0c8684a0e7db84d9d0aa073ddfe3cc04`,
    );
    const data = await response.json();
    if (data.cod === 404) {
      ErrorMsg("City Not Found");
      return;
    }
    console.log(data);
    renderWeatherData(data);
  } catch (error) {
    ErrorMsg("Something Went Wrong");
  } finally {
    antiSpam(false);
  }
}

//Remove Error Message
function ErrorMsg(msg) {
  cityName.textContent = msg;
  temperature.textContent = "";
  weatherDescription.textContent = "";
}

//anti spam
function antiSpam(isDisabled) {
  searchBtn.disabled = isDisabled;
  cityInput.disabled = isDisabled;
}

//loading Message
function loadingMessage() {
  cityName.textContent = "Fetching data Please Wait";
  temperature.textContent = "";
  weatherDescription.textContent = "";
}

//rendering weather data
function renderWeatherData(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${data.main.temp}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherDescription.textContent = data.weather[0].description;
}

//event listeners

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
});

searchBtn.addEventListener("click", searchHandler);
