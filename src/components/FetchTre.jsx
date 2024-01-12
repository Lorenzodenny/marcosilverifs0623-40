import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherForecast2 = ({ latitude, longitude }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration`;

        const response = await axios.get(apiUrl);

        setForecastData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchForecast();
  }, [latitude, longitude]); 

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 'clearsky_day':
        return faSun;
      case 'partlycloudy_day':
      case 'cloudy_day':
        return faCloud;
      case 'rain_showers_day':
      case 'rain_day':
      case 'freezingrain_day':
      case 'freezingdrizzle_rain_day':
        return faSnowflake;
      // Aggiungi altri casi a seconda dei tuoi requisiti
      default:
        return faSun; // Icona predefinita per le condizioni non gestite
    }
  };

  return (
    <div>
      <h2>Previsioni del tempo</h2>
      {forecastData ? (
        <div>
          <h3>Previsioni giornaliere:</h3>
          <ul className='abel'>
            {forecastData.daily.time.map((date, index) => {
              const data = new Date(date);
              const giorno = data.getDate();
              const mese = data.getMonth() + 1;

              const formatoData = `${giorno} / ${mese}`;

              return (
                <li key={index} className='cacca'>
                  <span>Data:</span> {formatoData}, Max: {forecastData.daily.temperature_2m_max[index]}°C, Min: {forecastData.daily.temperature_2m_min[index]}°C
                  <FontAwesomeIcon icon={getWeatherIcon(forecastData.daily.weather_code[index])} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : error ? (
        <p>Errore nella richiesta: {error}</p>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default WeatherForecast2;
