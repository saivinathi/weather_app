function getWeather(){
    // after button click
    var cityName = document.querySelector(".inputText").value;
    var dateN = document.querySelector(".dateD").value;
    var res = dateN.replaceAll("-", "/");
    // alert(res);
    fetch("https://meta-weather.vercel.app/api/location/search/?query="+cityName)
        .then(function weather(data){
            return data.json();
        })
        .then(function weather(data){
            console.log(data);
            var woeId = data[0].woeid;
            // console.log(woeId);

            fetch("https://meta-weather.vercel.app/api/location/"+woeId+"/")
                .then(function weather(data){
                    return data.json();
                })
                .then(function weather(data){
                    // console.log(data)
                    var cityTitle = data.title;
                    var country = data.parent.title;
                    var date = getDate(data.time);
                    console.log("date : "+date)
                    var weatherData = data.consolidated_weather[0];
                    var generalWeather = weatherData.weather_state_name;
                    var temp = weatherData.the_temp;
                    var humidity  = weatherData.humidity;
                    var wind = weatherData.wind_speed;
                    fetch("https://meta-weather.vercel.app/api/location/"+woeId+"/"+res+"/")
                        .then(function weather(data){
                        return data.json();
                    }).then(function weather(data){
                        console.log(data);
                        humidity1 = data[0].humidity;
                        wind1 = data[0].wind_speed;
                        temp1 = data[0].the_temp;

                    })
                    
                    console.log(cityTitle, country, date, generalWeather, temp);

                    var cityElement = document.querySelector(".city-name");
                    cityElement.textContent = cityTitle;

                    var countryElement = document.querySelector(".country");
                    countryElement.textContent = country;

                    var subtitleTextElement = document.querySelector(".subtitle");
                    subtitleTextElement.textContent = date + ", " + generalWeather;

                    var tempElement = document.querySelector(".temperature");
                    tempElement.textContent = temp1 + "° C";
                    
                    var humidityEl = document.querySelector("#humidity");
                    humidityEl.textContent = "humidity: " + humidity1 + "%";

                    var windEl = document.querySelector("#wind");
                    windEl.textContent = "wind: " + parseInt(wind1) + " Km/h"
                })

        })

}




function getDate(dateString){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    return `${days[d.getDay()]}, ${d.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric'})}`;
}