
let iconElement = document.querySelector(".weather-icon");
let tempElement = document.querySelector(".temprature-value");
let descElement = document.querySelector(".temperature-description");
let locationElement = document.querySelector(".location");
let notificationElement = document.querySelector(".notification");



const weather ={};
weather.temperature={
    unit  : "celsius"
}

const KELVIN =273;
const key = "82005d27a116c2880c8f0fcb866998a0 ";
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);

}

else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML="<p> Browser dosent support Geolocation</p>";
}
function setPosition(position){
    let latitude= position.coords.latitude;
    let longtitude=position.coords.longitude;
    getWeather(latitude,longtitude);
}
function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p> ${error.message} </p>`;

}
function getWeather (latitude,longtitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=8b36d31e7bf1fa94363fc455c7b1dd5a`;
    fetch(api)
        .then(function(response){
            let data= response.json();
            return data;

        })
        .then(function(data){
            console.log(data);
            weather.temperature.value=Math.floor(data.main.temp - KELVIN);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country = data.sys.country;
            console.log(weather);
        })
        .then (function(){
            displayWeather();
        });

}
function displayWeather(){
    console.log(iconElement, tempElement,descElement);
    iconElement.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather.iconId}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    locationElement.innerHTML=`${weather.city}, ${weather.country}`;
    descElement.innerHTML=`${weather.description}`;
}

function celsiusToFarenhiet(temperature){
    return (temperature * 9/5) + 32;

}
tempElement.addEventListener("click",function()
{
    if(weather.temperature.value===undefined)return;
    if(weather.temperature.unit=="celsius"){
        let farenhiet= celsiusToFarenhiet(weather.temperature.value);
        farenhiet=Math.floor(farenhiet);
        tempElement.innerHTML=`${farenhiet}°<span>C</span>`;
        weather.temperature.unit=="farenhiet";

    }
    else{
        tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit=="celsius"
    }
});




// for  City-Name based
let cityName = 'nowshera';
let lat = 34;
let long = 72;

function setCityName(name){ cityName = name; }
function setLat(value){  lat = value; }
function setLong(value){ long = value; }

// get by city
function getByCityName(){
    let api =`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8b36d31e7bf1fa94363fc455c7b1dd5a`;
    fetch(api)
        .then(function(response){
            let data= response.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            weather.temperature.value=Math.floor(data.main.temp - KELVIN);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country = data.sys.country;
            console.log(weather);
        })
        .then (function(){
            displayWeather();
        });

}

// get by Geo Location
function getByGeoLoc(){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8b36d31e7bf1fa94363fc455c7b1dd5a`;
    fetch(api)
        .then(function(response){
            let data= response.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            weather.temperature.value=Math.floor(data.main.temp - KELVIN);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country = data.sys.country;
            console.log(weather);
        })
        .then (function(){
            displayWeather();
        });

}
