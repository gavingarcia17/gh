document.getElementById('city-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Get the city name from the input field
    const city = document.getElementById('city-input').value;
    
    // Define the URL for the API request to the proxy server
    const weatherApiUrl = `/api/weather?city=${city}`;
    
    try {
        // Fetch the current weather data from the proxy server
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        
        // Display the current weather data
        if (weatherData.error) {
            document.getElementById('weather-info').innerHTML = `<p>${weatherData.error.info}</p>`;
        } else if (weatherData.current) {
            const { temperature, weather_descriptions, humidity, wind_speed } = weatherData.current;
            document.getElementById('weather-info').innerHTML = `
                <div class="weather-item"><strong>Temperature:</strong> ${temperature}°C</div>
                <div class="weather-item"><strong>Description:</strong> ${weather_descriptions[0]}</div>
                <div class="weather-item"><strong>Humidity:</strong> ${humidity}%</div>
                <div class="weather-item"><strong>Wind Speed:</strong> ${wind_speed} km/h</div>
            `;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
});