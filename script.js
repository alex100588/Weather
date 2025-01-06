const cityInput = document.querySelector(".city-input");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const icon = document.querySelector(".weather-icon");
const date = document.querySelector(".date");
const tempFeel = document.querySelector(".temp-feel");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
console.log(cityInput.value);
const body = document.querySelector("body");

cityInput.addEventListener("change", (e) => {
  const value = e.target.value;
  getWeather(value);
});

window.addEventListener("load", () => {
  getWeather(cityInput.value);
});

async function getWeather(city) {
  try {
    const response = await fetch(
      "https://api.api-ninjas.com/v1/weather?city=" + city,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "lUYW1Wu896E7NTbZXKpiHw==H5x1D9Z79nme4g2l",
        },
      }
    );

    const data = await response.json();

    updateUiInfo(data);
  } catch (error) {
    console.log(error);
  }
}

const updateUiInfo = (info) => {
  city.innerHTML = cityInput.value;
  temperature.innerHTML = info.temp;

  if (info.temp > 20) {
    icon.classList.remove(
      "bi-brightness-high-fill",
      ".bi-brightness-alt-low-fill",
      ".bi-snow"
    );
    icon.classList.add("bi-brightness-high-fill");
    body.style.background = "url(images/summer.jpg)";
  } else if (info.temp < 10) {
    icon.classList.remove(
      "bi-brightness-high-fill",
      ".bi-brightness-alt-low-fill",
      ".bi-snow"
    );
    icon.classList.add("bi-snow2");
    body.style.background = "url(images/winter.jpg)";
  } else {
    icon.classList.remove(
      "bi-brightness-high-fill",
      ".bi-brightness-alt-low-fill",
      ".bi-snow"
    );
    icon.classList.add("bi-brightness-alt-low-fill");
    body.style.background = "url(images/autumn.jpg)";
  }
  date.innerHTML = new Date().toDateString();
  tempFeel.innerHTML = info.feels_like;
  wind.innerHTML = info.wind_speed;
  humidity.innerHTML = info.humidity;
};
