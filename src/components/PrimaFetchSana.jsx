import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForecast from './SecondoFetch';

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('Berlin');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effettua una richiesta GET all'API con il parametro dinamico
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=en&format=json`);
        
        // Prendi solo il primo risultato dalla risposta
        const firstResult = response.data.results[0];

        // Imposta i dati nel tuo stato locale
        setData(firstResult);
      } catch (error) {
        // Gestisci gli errori
        setError(error.message);
      }
    };

    // Chiama la funzione fetchData quando il componente si monta o quando searchTerm cambia
    fetchData();
  }, [searchTerm]); // L'array [searchTerm] assicura che la richiesta venga fatta quando searchTerm cambia

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {data ? (
        // Mostra la latitudine e la longitudine
        <>
            <p>Latitudine: {data.latitude}</p>
            <p>Longitudine: {data.longitude}</p>
            <WeatherForecast a={data.latitude} b={data.longitude} />
        </>
      ) : error ? (
        // Mostra l'errore in caso di fallimento della richiesta
        <p>Errore nella richiesta: {error}</p>
      ) : (
        // Mostra uno stato di caricamento mentre attendi la risposta
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default MyComponent;
