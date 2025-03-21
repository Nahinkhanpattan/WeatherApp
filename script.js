let city = document.querySelector("#city");
let check = document.querySelector("#check");
let tempIcon = document.querySelector("#tempIcon");
let weatherCountry = document.querySelector("#weatherCountry");
let temperature = document.querySelector("#temperature");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");

check.addEventListener("click", () => {
    const apiKey = "795b11c5d555869db7947e083b00971e";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=";

    if (city.value === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`${url}${city.value}&lang=en&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (!data || data.cod !== 200) {
                alert("City not found. Please enter a valid city.");
                weatherCountry.innerText = "City Name";
                temperature.innerHTML = "--°C";
                humidity.innerText = "Humidity: --%";
                windSpeed.innerText = "Wind Speed: -- km/h";
                tempIcon.src = "default.png"; // Reset to default icon
                return;
            }

            weatherCountry.innerText = `${data.name}, ${data.sys.country}`;
            temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
            humidity.innerText = `Humidity: ${data.main.humidity}%`;
            windSpeed.innerText = `Wind Speed: ${data.wind.speed} km/h`;

            // ✅ Load background image properly
            const img = new Image();
            img.src = `https://source.unsplash.com/1600x900/?${data.name}`;
            img.onload = () => {
                document.body.style.backgroundImage = `url('${img.src}')`;
            };
            img.onerror = () => {
                console.error("Background image failed to load.");
            };

            // ✅ Set weather icon correctly
            let weatherId = data.weather[0].id;
            if (weatherId < 250) {
                tempIcon.src = "storm.svg";
            } else if (weatherId < 350) {
                tempIcon.src = "drizzle.svg";
            } else if (weatherId < 550) {
                tempIcon.src = "snow.svg";
            } else if (weatherId < 650) {
                tempIcon.src = "rain.svg";
            } else if (weatherId < 800) {
                tempIcon.src = "atmosphere.svg";
            } else if (weatherId === 800) {
                tempIcon.src = "sun.svg";
            } else if (weatherId > 800) {
                tempIcon.src = "clouds.svg";
            }

            city.value = "";
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching weather data.");
        });
});
