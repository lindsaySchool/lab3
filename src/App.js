export default class App{
    constructor(){
        console.log("Hello from App.js");
        this.getLocation();
    }
    //Get the location of the user
    getLocation() {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }
    //Show the position of the user
    showPosition(position) {
        console.log(position);
        //x - coordinate
        let x = position.coords.latitude;
        console.log(x);
        //y - coordinate
        let y = position.coords.longitude;
        console.log(position.coords.longitude);

        this.getWeather(x, y);
    }
    //Get the weather from the API
    getWeather(x, y) {
        //url: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1
        //fetch, then log results
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                //Get the temperature from the API
                let temp = data.current_weather.temperature;
                document.querySelector("h2").innerHTML = temp + "°C";
            })
            .catch(error => console.log(error));
    }
}