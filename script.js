var WeatherData;
var request = new XMLHttpRequest();


loadData();

function loadData() {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q=Salt+Lake+City,US&units=I&days=5&appid=7df4ef1367d7ee00348a0b9655e4c6e8');  
    request.onload = loadComplete;
    request.send();
}



function loadComplete(evt) {
    WeatherData = JSON.parse(request.responseText);
    console.log(WeatherData);
    
    var dates;
    
    for (var i = 0; i < 5; i++) {
        dates = new Date(WeatherData.list[8 * i + 3].dt * 1000);
        
        document.getElementById("place" + i).innerHTML = WeatherData.city.name;    
        document.getElementById("day" + i).innerHTML = (dates.getMonth() + 1) + "/" + dates.getDate();
        document.getElementById("currentTemp" + i).innerHTML = (parseInt(((WeatherData.list[8 * i + 3].main.temp_max - 273.15) * 1.8) + 32) + "°F");
        document.getElementById("conditionsDesc" + i).innerHTML = WeatherData.list[8 * i + 3].weather[0].description;
        if (WeatherData.list[8 * i + 3].weather[0].main == "Clear") {
            document.getElementById("conditionsImg" + i).src = "./Clear.png";
        } if (WeatherData.list[8 * i + 3].weather[0].main == "Rain") {
            document.getElementById("conditionsImg" + i).src = "./Rain.png";
        } if (WeatherData.list[8 * i + 3].weather[0].main == "Clouds") {
            document.getElementById("conditionsImg" + i).src = "./Clouds.png";
        }       
    }
    
}