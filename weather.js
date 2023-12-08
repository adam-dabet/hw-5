document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.getElementById("weather-widget");
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display='inline';
    const temperatureElement = document.getElementById("temperature");
    const conditionsElement = document.getElementById("conditions");
    const weatherMessage = document.getElementById("weather-message");

    const windSpeedElement = document.getElementById("wind-speed");
    const humidityElement = document.getElementById("humidity");



    // National Weather Service API endpoint
    const apiEndpoint = `https://api.weather.gov/points/32.87083,-117.25083`;

    // Fetch weather data from the API
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        // Check if the data is available and has properties.forecast
        if (data.properties && data.properties.forecastHourly) {
          const forecastEndpoint = data.properties.forecastHourly;

          // Fetch forecast data from the API
          return fetch(forecastEndpoint);
        } else {
          throw new Error("Forecast URL not found in API response");
        }
      })
      .then(response => response.json())
      .then(forecastData => {
        // Check if the data is available and has properties.periods
        if (forecastData.properties && forecastData.properties.periods && forecastData.properties.periods.length > 0) {
          const currentConditions = forecastData.properties.periods[0];
          
          // Display weather information
          weatherIcon.className = getWeatherIconClass(currentConditions.shortForecast);
          temperatureElement.textContent = `${currentConditions.temperature} ${currentConditions.temperatureUnit}`;
          conditionsElement.textContent = currentConditions.shortForecast;
          windSpeedElement.textContent = `${currentConditions.windSpeed} ${currentConditions.windDirection}`;
          humidityElement.textContent = `${currentConditions.relativeHumidity.value}%`;

          // Hide the "unavailable" message
          weatherMessage.style.display = "none";
        } else {
          throw new Error("No forecast data available");
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);

        // Show the "unavailable" message
        weatherMessage.textContent = "Current Weather Conditions Unavailable";
      });


      function getWeatherIconClass(condition) {
        switch (condition) {
          case "Sunny":
            return "fa fa-sun";
          case "Partly Sunny":
            return "fa fa-cloud-sun";
          case "Mostly Sunny":
            return "fa fa-sun";
          case "Partly Cloudy":
            return "fa fa-cloud";        
          case "Mostly Clear":
            return "fa fa-moon";
          case "Mostly Cloudy":
            return "fa fa-cloud";
          case "partly-cloudy-night":
            return "fa fa-cloud";
          default:
            return "fa fa-question";
        }
      
      }
  });