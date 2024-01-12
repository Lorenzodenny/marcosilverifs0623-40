import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = (props) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        // Costruisci l'URL della richiesta API con le latitudini e longitudini fornite
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${props.b}&longitude=${props.a}&hourly=temperature_2m`;

        // Effettua una richiesta GET all'API del meteo
        const response = await axios.get(apiUrl);
        
        // Imposta i dati della previsione nel tuo stato locale
        setForecastData(response.data);
      } catch (error) {
        // Gestisci gli errori
        setError(error.message);
      }
    };

    // Chiama la funzione fetchForecast quando il componente si monta o quando latitude o longitude cambiano
    fetchForecast();
  }, [props.a, props.b]); // L'array [latitude, longitude] assicura che la richiesta venga fatta quando una delle prop cambia

  return (
    <div>
      <h2>Previsioni del tempo</h2>
      {forecastData ? (
        // Mostra i dati della previsione
        <div style={{ display: 'flex' }}>
          <h3>ore che francesco lo prende al c**o:</h3>
          <ul style={{ width: '25%', listStyleType: 'none' }}>
            {forecastData.hourly.temperature_2m.map((gradi, index) => (
              <li key={index}>{gradi}</li>
            ))}
          </ul>
          <ul style={{ width: '50%', listStyleType: 'none' }}>
            {forecastData.hourly.time.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      ) : (
        // Mostra uno stato di caricamento mentre attendi la risposta
        <p>Caricamento...</p>
      )}
    </div>
  );
  
  
};

export default WeatherForecast;
