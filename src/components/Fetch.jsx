import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForecast from './SecondoFetch';
import WeatherForecast2 from './FetchTre';

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=3&language=it&format=json`);
      const resultsList = response.data.results;
      setResults(resultsList);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const handleResultClick = (index) => {
    setSelectedResult(results[index]);
    // Azzera la lista dei risultati e il termine di ricerca
    setResults([]);
    setSearchTerm('');
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z\s]/gi, '');

    if (inputValue.length <= 16) {
      setSearchTerm(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className='ricerca'
        maxLength={16}
      />
      <button onClick={handleSearchClick}>Cerca</button>
      {isLoading ? (
        <p>Caricamento...</p>
      ) : results.length > 0 ? (
        <div>
          <h3>Risultati della ricerca:</h3>
          <ul>
            {results.map((result, index) => (
              <li className='ricerche' key={index} onClick={() => handleResultClick(index)}>
                <strong>Nome:</strong> {result.name}
                <br />
                <span>Country: {result.country}</span>
                <br />
                <span>Region: {result.admin1}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {selectedResult ? (
        <>
          <p>Dettagli del risultato selezionato:</p>
          <p>Nome: {selectedResult.name}</p>
          <p>Latitudine: {selectedResult.latitude}</p>
          <p>Longitudine: {selectedResult.longitude}</p>
          <p>Country: {selectedResult.country}</p>
          <p>Region: {selectedResult.admin1}</p>
          <WeatherForecast a={selectedResult.latitude} b={selectedResult.longitude} />
          <WeatherForecast2 latitude={selectedResult.latitude} longitude={selectedResult.longitude} />
        </>
      ) : null}
      {error ? <p>Errore nella richiesta: {error}</p> : null}
    </div>
  );
};

export default MyComponent;
