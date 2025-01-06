import React, { useState, useEffect } from "react";
import "./styles/app.css";
import WeatherInfo from "./components/WeatherInfo";
import SearchBar from "./components/SearchBar";

const apiKey = "13a8763e58314907b5571443250601"; // Replace with your API key

function App() {
  const [city, setCity] = useState("Ludhiana");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
  
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
      );
      if (!response.ok) throw new Error("City not found!");
      const data = await response.json();
      console.log(data);
      const { location, current, forecast } = data;
  
      // Get only the next 3 days starting from tomorrow
      const tomorrowToNextThreeDays = forecast.forecastday.slice(1, 4);
  
      setWeather({
        name: location.name,
        temp: current.temp_c,
        humidity: current.humidity,
        description: current.condition.text,
      });
      setForecast(tomorrowToNextThreeDays);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Fetch weather data for the default city on initial load
    fetchWeather(city);

    // Set up periodic updates every 24 hours
    const interval = setInterval(() => {
      fetchWeather(city);
    }, 24 * 60 * 60 * 1000); // Every 24 hours

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [city]); // Depend on the city to refetch if the city changes

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <SearchBar fetchWeather={fetchWeather} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather && <WeatherInfo weather={weather} forecast={forecast} />}
    </div>
  );
}

export default App;
