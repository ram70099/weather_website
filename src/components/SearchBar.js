import React, { useState } from "react";
import "./../styles/SearchBar.css";

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    fetchWeather(city);
    setCity(""); // Clear input after search
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
