import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../Assets/search.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

import snow_icon from '../Assets/snow.gif';
import clear_icon from '../Assets/clear.gif';
import cloud_icon from '../Assets/cloud.gif';
import drizzle_icon from '../Assets/drizzle.gif';
import rain_icon from '../Assets/rain.gif';

const Weatherapp = () => {
  const api_key = "1aac09f1e3b15a623e0b0dbfa6dcbea6";

  const [wicon, setWicon] = useState(clear_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      alert("Enter any country name!");
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = data.wind.speed + " km/h";
      temperature[0].innerHTML = data.main.temp + " °C";
      location[0].innerHTML = data.name;

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "11n":
          setWicon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <h1 className='city'>Enter  your country</h1>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" width={'40px'} /> <br />
        </div>
      </div>
      <div className="weather-image">
        <br /><center>
        <img src={wicon} alt="" width={'580px'}  height={'200px'}/> </center>
      </div>
      <div className="weather-temp">45 °C</div>
      <div className="weather-location">India</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" width={'40px'} />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon"  width={'40px'}/>
          <div className="data">
            <div className="wind-rate">18km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;
