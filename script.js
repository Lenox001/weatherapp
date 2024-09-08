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
        myLocation.style.display="none"
        


    })
    .catch(error => alert('Error fetching weather data/Invalid City:', error));
}else{
    alert("Please Enter A City")
}
document.getElementById('cityInput').value = "";

   })
   function getWeather() {
    document.getElementById("loadingMessage").style.display = "block";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        myLocation.innerHTML = "Unsupported Location";
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
                const myTemp=document.getElementById("Loctemp")
                const tempp=data.current.temp_c;
                 myTemp.textContent = `${tempp}°C`
                 myTemp.style.fontSize="2rem"
                 const geolocate=document.getElementById("locName")
                 geolocate.textContent = data.location.name
                  const weatherDescription=document.getElementById("locdesc")
                 weatherDescription.textContent = data.current.condition.text;
                 const iconUrl=document.getElementById("locICON")
                iconUrl.src = data.current.condition.icon
                const myLocation=document.getElementById("loc-weather")
            
                myLocation.style.backgroundColor="darkgrey"
               
                myLocation.style.fontFamily="'Poppins'"
                myLocation.style.fontSize="1.4rem"
                myLocation.style.color="black"
                myLocation.style.opacity = 1;
                myLocation.style.display="flex"
                myLocation.style.alignItems = "center"
                myLocation.style.justifyContent = "space-between";
                myLocation.style.paddingRight = "20px"; 
                iconUrl.style.float = "left"; 
                
                
                 document.getElementById("loadingMessage").style.display = "none"
        
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('loc-weather').innerHTML = 'Unable to retrieve weather data.';
                document.getElementById("loadingMessage").style.display = "none";
            });
    }

    function error() {
        document.getElementById('loc-weather').innerHTML = 'Unable to retrieve your location.';
        document.getElementById("loadingMessage").style.display = "none";
    }
}

window.onload = getWeather;
