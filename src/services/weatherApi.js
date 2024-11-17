const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';

export const getWeather = async (city, countryCode) => {
    try {
      const url = `${BASE_URL}?city=${city},${countryCode}&days=10&key=${API_KEY}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(
          `Error fetching weather data: ${response.status} ${response.statusText}`
        );
      }
  
      const data = await response.json();
  
      if (!data || !data.data) {
        throw new Error("Invalid data format received from API");
      }
  
      return data.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  