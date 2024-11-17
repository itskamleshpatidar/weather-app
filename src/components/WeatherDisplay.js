import React, { useState } from 'react';
import styled from 'styled-components';
import CountryDropdown from './CountryDropdown';
import { getWeather } from '../services/weatherApi';
import Loader from 'react-js-loader';
import CloudIcon from '../assets/icons/cloud-icon.svg';
import SearchIcon from '../assets/icons/search-icon.svg';

const WeatherWrapper = styled.div`
  color: white;
  text-align: center;
  padding: 20px;
`;


const WeatherDisplay = ({ setAverageTemp }) => {
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [averageTemp, setLocalAverageTemp] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      setWeatherData(null);
  
      try {
        const data = await getWeather(city, countryCode);
        setWeatherData(data);
  
        const calculatedAverage = calculateAverageTemp(data);
        setLocalAverageTemp(calculatedAverage);
        setAverageTemp(calculatedAverage);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setIsLoading(false);
      }
    };
  
    const calculateAverageTemp = (data) => {
      if (!data || data.length === 0) return 0;
      const totalTemp = data.slice(0, 10).reduce((sum, day) => sum + day.temp, 0);
      return (totalTemp / 10).toFixed(1);
    };
  
    return (
      <WeatherWrapper>
        <div className='search-box'>
          <img src={CloudIcon} alt="Cloud Icon" className="cloud-icon" />
          
          <CountryDropdown 
            value={countryCode} 
            onChange={(e) => setCountryCode(e.target.value)} 
            className="language-select" 
          />
  
          <input
            type="text"
            className="location-input"
            placeholder="Please enter your location..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          
          <button className="search-button" onClick={fetchWeather}>
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          </button>
        </div>
  
        {isLoading && <Loader type="spinner" />}
        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
  
        {weatherData && (
          <div className="weather-results">
            <h4>
              {new Date(weatherData[0].datetime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(weatherData[6].datetime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </h4>
            <div className="temperature">
              {averageTemp}<sup>°C</sup>
            </div>
            <div className="forecast">
              {weatherData.slice(0, 7).map((day, index) => (
                <div key={index} className="forecast-day">
                  <h6>{new Date(day.datetime).toLocaleDateString("en-US", { weekday: 'long' })}</h6>
                  <p>{day.temp}<sup>°C</sup></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </WeatherWrapper>
    );
};
  
export default WeatherDisplay;
