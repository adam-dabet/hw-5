document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.getElementById("weather-widget");
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display='inline';
    const temperatureElement = document.getElementById("temperature");
    const conditionsElement = document.getElementById("conditions");
    const weatherMessage = document.getElementById("weather-message");

    // Coordinates for UCSD (La Jolla)
    const latitude = 32.8328;
    const longitude = -117.2713;

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
          weatherIcon.src = currentConditions.icon;
          temperatureElement.textContent = `${currentConditions.temperature} ${currentConditions.temperatureUnit}`;
          conditionsElement.textContent = currentConditions.shortForecast;

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
  });