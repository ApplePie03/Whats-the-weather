const locationHeader = document.querySelector(".location");
const icon = document.querySelector(".icon");
const description = document.querySelector(".description");
const pressure = document.querySelector(".pressureValue");
const humidity = document.querySelector(".humidityValue");
const visibility = document.querySelector(".visibilityValue");
const windSpeed = document.querySelector(".windValue");
const temperature = document.querySelector(".temperature");
const cityInput = document.querySelector(".input");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fetchLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=4d1ea896fa56d66119e458c28e5a1359`;
  // console.log(fetchLink);
  fetch(fetchLink)
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
      if (response.cod != 404) {
        locationHeader.innerHTML = response.name;
        // icon here
        const temp = response.main.temp.toFixed(1);
        const iconDesc = response.weather[0].main;
        switch (iconDesc) {
          case "Clouds":
            icon.classList.replace(icon.classList[1], "fa-cloud");
            break;
          case "Rain":
            icon.classList.replace(icon.classList[1], "fa-cloud-rain");
            break;
          case "Clear":
            icon.classList.replace(icon.classList[1], "fa-cloud-sun");
            break;
          default:
            icon.classList.replace(icon.classList[1], "fa-question");
            break;
        }
        temperature.innerHTML = `${temp}°C`;
        icon.style.textIndent = "50px";
        description.innerHTML = response.weather[0].description;
        pressure.innerHTML = response.main.pressure;
        humidity.innerHTML = response.main.humidity;
        visibility.innerHTML = response.visibility;
        windSpeed.innerHTML = response.wind.speed;
      } else {
        locationHeader.innerHTML = "Not found";
        icon.classList.replace(icon.classList[1], "fa-question");
        temperature.innerHTML = "0°C";
        description.innerHTML = "Not available";
        pressure.innerHTML = "N/a ";
        humidity.innerHTML = "N/a ";
        visibility.innerHTML = "N/a ";
        windSpeed.innerHTML = "N/a ";
      }
    })
    .catch((e) => console.log(e));
});
