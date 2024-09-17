document.getElementById("searchBtn").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = '045fe8528bbb4dba8e874938240409';  
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';
    const url = `${baseUrl}?key=${apiKey}&q=${city}`;
    
    if (city) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid City");
                }
                return response.json();
            })
            .then(data => {
                const iconUrl = `https:${data.current.condition.icon}`;
                const forecast = document.getElementById("currentWeather");
                const cityName = document.getElementById("cityName");
                const temp = document.getElementById("temperature");
                const description = document.getElementById("description");
                const temperature = data.current.temp_c;
                
                document.querySelector('#weatherIcon').src = iconUrl;
                cityName.textContent = data.location.name;
                temp.innerHTML = `${temperature}°C`;
                description.textContent = data.current.condition.text;
                
                forecast.style.display = "flex";
                document.getElementById("loc-weather").style.display = "none";
            })
            .catch(error => alert('Error fetching weather data: ' + error.message));
    } else {
        alert("Please Enter A City");
    }
    
    document.getElementById('cityInput').value = "";
});

function getWeather() {
    document.getElementById("loadingMessage").style.display = "block";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        document.getElementById("loc-weather").innerHTML = "Unsupported Location";
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = '045fe8528bbb4dba8e874938240409'; 
        const baseUrl = 'https://api.weatherapi.com/v1/current.json';
        const url = `${baseUrl}?key=${apiKey}&q=${lat},${lon}&units=metric`;
        
        localStorage.setItem('lat', lat);
        localStorage.setItem('lon', lon);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data could not be fetched');
                }
                return response.json();
            })
            .then(data => {
                const temp = data.current.temp_c;
                const location = data.location.name;
                const weatherDescription = data.current.condition.text;
                const iconUrl = `https:${data.current.condition.icon}`;

                document.getElementById("locName").textContent = location;
                document.getElementById("Loctemp").textContent = `${temp}°C`;
                document.getElementById("locdesc").textContent = weatherDescription;
                document.getElementById("locICON").src = iconUrl;
                document.getElementById("loc-weather").style.opacity = "1";
                document.getElementById("loadingMessage").style.display = "none";
            })
            .catch(error => alert('Error fetching weather data: ' + error.message));
    }

    function error() {
        document.getElementById("loc-weather").innerHTML = "Unable to retrieve your location.";
        document.getElementById("loadingMessage").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getWeather();
});
