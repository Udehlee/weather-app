//getting all the required element
const inputBox = document.querySelector("input");
const searchButton = document.querySelector("button");

const invalidCity = document.querySelector("#invalid-city");
const weatherDetails = document.querySelector("#weather-details");

const date = document.querySelector(".date");
const cityName = document.querySelector(".city");
const iconImage = document.querySelector(".icon-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");


const feelsLike = document.querySelector(".feels-like-temp");
const windSpeed = document.querySelector(".wind-speed");



let icon;// will be used to access the weather icon

// get the url for the weather api and split it into various constant
//input in into several constant

const apiKeys = "d2d241ac6a296aebf2c41248109ffe9e";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

//making a request to fetch weatherData
async  function weatherData(city) {
  const response = await fetch(url + city + `&appid=${apiKeys}` + `&units=${unit}`);

  if (response.status == 200) {

        const data = await response.json(); //getting multiple data from the weather and converting it to a json object

        date.innerHTML = getDate();
        cityName.innerHTML = `${data.name}, ${data.sys.country}`

        //for the icon
        icon = data.weather[0].icon;
        iconImage.src = "https://openweathermap.org/img/wn/" + icon + "@4x.png"

        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        description.innerHTML = data.weather[0].description;
        feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";
        windSpeed.innerHTML = Math.round(data.wind.speed) + "Km/hr";


        //display the weather details whenever the city is inputted
        invalidCity.classList.add('hide');
        weatherDetails.classList.remove('hide');


        console.log(data);

  } else {

    invalidCity.classList.remove('hide');
    weatherDetails.classList.add('hide');
  }

}
//getting current date details
function getDate() {

  var today = new Date();

  var options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  };
  var day = today.toLocaleDateString("en-US", options);
  return day;
}
//when ever the search button is clicked it should  display city details
searchButton.onclick = () => {
  weatherData(inputBox.value);
};
