const axios = require('axios');
const { weatherApiKey } = require('../config/envConfig');

exports.getcurrentWeatherData = async (latitude, longitude) => {
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

exports.getHistoricalWeatherData = async (latitude, longitude, days) => {
  try {
    const url = 'https://api.weatherapi.com/v1/history.json';
    const today = new Date();
    const endDate = today.toISOString().slice(0, 10);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);
    const startDateString = startDate.toISOString().slice(0, 10);
    const response = await axios.get(url, {
      params: {
        key: weatherApiKey,
        q: `${latitude},${longitude}`,
        dt: startDateString, // Start date and end date in YYYY-MM-DD format
        end_dt: endDate,
      },
    });

    if (response.status === 200) {
      const data = response.data;
      const summaryData = makeHistoricalDataSummary(data);
      return summaryData;
    } else {
      throw new Error('unable to fetch weather data');
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.error;
    } else {
      return {
        message: 'an error occurred while fetching historical weather data',
      };
    }
  }
};

function makeHistoricalDataSummary(data) {
  let totalTemp = 0;
  let totalPrecipitation = 0;
  let totalWindSpeed = 0;
  let totalHumidity = 0;
  let count = 0;
  data.forecast.forecastday.forEach((day) => {
    totalTemp += day.day.avgtemp_c;
    totalPrecipitation += day.day.totalprecip_mm;
    totalWindSpeed += day.day.maxwind_kph;
    totalHumidity += day.day.avghumidity;
    count++;
  });
  const avgTemp = totalTemp / count;
  const avgWind = totalWindSpeed / count;
  const avgHumidity = totalHumidity / count;

  return {
    averageTemperature: `${avgTemp.toFixed(2)}°C`,
    totalPrecipitation: `${totalPrecipitation.toFixed(2)}mm`,
    averageWindSpeed: `${avgWind.toFixed(2)}km/h`,
    averageHumidity: `${avgHumidity.toFixed(2)}%`,
  };
}
