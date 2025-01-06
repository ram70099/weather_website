import React from "react";
import "./../styles/Forcast.css";

const ForecastCard = ({ day }) => {
  const { date, day: dayDetails } = day;

  // Convert the date into the day of the week
  const dayName = new Date(date).toLocaleDateString(undefined, { weekday: "long" });

  return (
    <div className="forecast-card">
      <p className="forecast-day">{dayName}</p>
      <img
        src={dayDetails.condition.icon}
        alt={dayDetails.condition.text}
        className="forecast-icon"
      />
      <p className="forecast-temp">Avg: {dayDetails.avgtemp_c}°C</p>
      <p className="forecast-description">{dayDetails.condition.text}</p>
    </div>
  );
};

export default ForecastCard;
