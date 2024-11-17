import React, { useState } from 'react';
import './css/weather.css';
import GradientBackground from './components/GradientBackground';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [averageTemp, setAverageTemp] = useState(0);

  return (
    <GradientBackground temp={averageTemp}>
      <WeatherDisplay setAverageTemp={setAverageTemp} />
    </GradientBackground>
  );
};

export default App;