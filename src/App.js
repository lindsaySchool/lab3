import { createClient } from 'pexels';
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
                this.editAdvertisment(temp);
            })
            .catch(error => console.log(error));
    }
    //Edit the advertisment
    editAdvertisment(temp){
        //Get the advertisment
        let adv = document.querySelector("#app");
        let title = document.querySelector("h1");
        let p = document.createElement("p");
        if(temp < 10){
            //Change the background and add a text
            adv.style.backgroundColor = "blue";
            p.innerHTML = "Watch some tv with some snacks and your favorite coca-cola!";
            title.after(p);
        } else if(temp > 20){
            adv.style.backgroundColor = "red";
            adv.style.backgroundImage = this.getBackgroundImage("beach");
            p.innerHTML = "Go to the beach and drink some refreshing coca-cola!";
            title.after(p);
        }else{
            //Temperature lower than 20 and higher than 10
            adv.style.backgroundColor = "green";
            p.innerHTML = "Go outside and drink some coca-cola!";
            title.after(p);
        }
    }
    //API Pexels
    getBackgroundImage(searchName){
        const client = createClient('rqen22CsrFROrJ9V6jazPJizrS8sIVzNnCIoAhVfk6AIeAHv0TTAcb3q');
        const query = searchName;
        client.photos.search({ query, per_page: 1 }).then(photos => {
            console.log(photos);
            return photos;
        });

    }
}