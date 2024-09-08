   document.getElementById("searchBtn").addEventListener("click",function(){
    const city=document.getElementById("cityInput").value.trim()
    const apiKey = '045fe8528bbb4dba8e874938240409';  
const baseUrl = 'https://api.weatherapi.com/v1/current.json';
const url = `${baseUrl}?key=${apiKey}&q=${city}`
if (city){
    fetch(url)
    .then (response=>{
        if (!response.ok){
            throw new error("Invalid  City")
        
    }
    
    
        return response.json()
    })
    .then(data=>{
        const iconUrl = `https:${data.current.condition.icon}`
        const forecast=document.getElementById("currentWeather")
        const cityName=document.getElementById("cityName")
        const temp=document.getElementById("temperature")
        const description=document.getElementById("description")
        const card=document.querySelector(".card")
        const temperature=data.current.temp_c
        card.style.display="flex"
        
        
        document.querySelector('#weatherIcon').src = iconUrl;
        cityName.textContent=data.location.name
        temp.innerHTML = `${temperature}°C`;
        description.textContent=data.current.condition.text
        forecast.style.backgroundColor="darkgrey"
        forecast.style.border="3px"
        forecast.style.borderRadius="20px"
        forecast.style.fontFamily="Cambria"
        document.getElementById("loc-weather").style.display="none"
        


    })
    .catch(error => alert('Error fetching weather data/Invalid City:', error));
}else{
    alert("Please Enter A City")
}
document.getElementById('cityInput').value = "";

   })
   function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        document.getElementById("loc-weather").innerHTML = "Unsupported Location";
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = '045fe8528bbb4dba8e874938240409'; 
        const baseUrl = `https://api.weatherapi.com/v1/current.json`;
        const url = `${baseUrl}?key=${apiKey}&q=${lat},${lon}&units=metric`;


        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data could not be fetched');
                }
                return response.json();
            })
            .then(data => {
                const temp = data.current.temp_c;
                const location = data.location.name
                const weatherDescription = data.current.condition.text;
                const iconUrl = data.current.condition.icon
                document.getElementById("loc-weather").innerHTML = `<img src="https:${iconUrl}" alt="Weather icon">${location}<br>Temperature: ${temp}°C <br> Weather: ${weatherDescription} 
                 `;
            
                document.getElementById("loc-weather").style.backgroundColor="darkgrey"
               
                document.getElementById("loc-weather").style.fontFamily="'Poppins'"
                document.getElementById("loc-weather").style.fontSize="2rem"
                document.getElementById("loc-weather").style.color="black"
                document.getElementById("loc-weather").style.opacity = 1;
        
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('loc-weather').innerHTML = 'Unable to retrieve weather data.';
            });
    }

    function error() {
        document.getElementById('loc-weather').innerHTML = 'Unable to retrieve your location.';
    }
}

window.onload = getWeather;
