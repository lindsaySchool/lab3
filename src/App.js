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
                document.querySelector("span").innerHTML = temp + "°C";
                console.log(temp);
                if(temp < 10){
                    //Change the background of the div with id App and add after the h2 element a p element with the text: "It's cold outside, watch some tv with some snacks and your favorite coca-cola!"
                    document.querySelector("#app").style.backgroundColor = "blue";
                    let p = document.createElement("p");
                    p.innerHTML = "It's cold outside, watch some tv with some snacks and your favorite coca-cola!";
                    document.querySelector("h1").after(p);

                } else if(temp > 20){
                    document.querySelector("#app").style.backgroundColor = "red";
                    let p = document.createElement("p");
                    p.innerHTML = "It's hot outside, go to the beach and drink some refreshing coca-cola!";
                    document.querySelector("h1").after(p);
                }else{
                    document.querySelector("#app").style.backgroundColor = "green";
                    let p = document.createElement("p");
                    p.innerHTML = "The sun is shining, go outside and drink some coca-cola!";
                    document.querySelector("h1").after(p);
                }
            })
            .catch(error => console.log(error));
    }
}