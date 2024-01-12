import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherForecast = (props) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${props.b}&longitude=${props.a}&hourly=temperature_2m`;
        const response = await axios.get(apiUrl);
        setForecastData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchForecast();
  }, [props.a, props.b]);

  const getTemperatureIcon = (temperature) => {
    if (temperature >= 30) {
      return faSun;
    } else if (temperature >= 20) {
      return faCloud;
    } else {
      return faSnowflake;
    }
  };

  return (
    <div>
      <h2>Previsioni del tempo</h2>
      {forecastData ? (
        <div style={{ display: 'flex' }}>
          <h3>Ore che francesco lo prende al c**o:</h3>
          <ul style={{ width: '25%', listStyleType: 'none' }}>
            {forecastData.hourly.temperature_2m.slice(0, 24).map((gradi, index) => (
              <li key={index} style={{ fontSize: '20px' }}>
                <FontAwesomeIcon icon={getTemperatureIcon(gradi)} />
                {gradi}°C
              </li>
            ))}
          </ul>
          <ul style={{ width: '50%', listStyleType: 'none' }}>
            {forecastData.hourly.time.slice(0, 24).map((time, index) => {
              const data = new Date(time);
              const ora = data.getHours() + ':' + (data.getMinutes() < 10 ? '0' : '') + data.getMinutes();
              const giorno = data.getDate();
              const mese = data.getMonth() + 1;

              const formatoDesiderato = `${ora} / ${giorno} / ${mese}`;

              return <li key={index}>{formatoDesiderato}</li>;
            })}
          </ul>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
