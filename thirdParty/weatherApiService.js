const axios = require('axios');
const { weatherApiKey } = require('../config/envConfig');

exports.getcurrentWeatherData = async (longitude, latitude) => {
  try {
    const url = 'https://api.weatherapi.com/v1/current.json';
    const response = await axios.get(url, {
      params: {
        key: weatherApiKey,
        q: `${latitude},${longitude}`,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      const formatedData = {
        location: `${data.location.name}, ${data.location.country}`,
        temperature: `${data.current.temp_c}°C`,
        weather: data.current.condition.text,
        humidity: `${data.current.humidity}%`,
        windSpeed: `${data.current.wind_kph} km/h`,
      };
      return formatedData;
    } else {
      throw new Error('unable to fetch weather data');
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return { message: 'an error occurred while fetching weather data' };
    }
  }
};
