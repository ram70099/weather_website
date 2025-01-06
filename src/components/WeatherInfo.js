import React from "react";
import ForecastCard from "./Forcast";
import "./../styles/WeatherInfo.css";

const WeatherInfo = ({ weather, forecast }) => {
  const { name, temp, humidity, description } = weather;

  return (
    <div className="weather-info">
      <h2>Weather in {name}</h2>
      <div className="main-details">
        <p className="temperature">{temp}°C</p>
        <p className="description">{description}</p>
        <p className="humidity">Humidity: {humidity}%</p>
      </div>

      <div className="forecast-section">
        <h3>3-Day Forecast</h3>
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <ForecastCard key={index} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
