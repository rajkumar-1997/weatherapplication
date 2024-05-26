const Location = require('../models/locationModel');
const weatherApiService = require('../thirdParty/weatherApiService');
const redisService = require('../thirdParty/redis');
exports.getWeatherForcast = async (req, res) => {
  try {
    const locationId = req.params.location_id;
    if (!locationId)
      return res.status(400).send({ message: 'Required params missing' });
    const location = await Location.findOne({
      where: { id: locationId },
      raw: true,
    });
    if (!location)
      return res.status(404).send({ message: 'location not found' });
    const longitude = location?.longitude;
    const latitude = location?.latitude;
    let weatherData;
    const redisKey = `${longitude}/${latitude}_weatherData`;
    const cachedWeatherData = await redisService.getValueFromRedis(redisKey);
    if (cachedWeatherData) {
      weatherData = JSON.parse(cachedWeatherData);
    } else {
      weatherData = await weatherApiService.getcurrentWeatherData(
        longitude,
        latitude
      );
      if (weatherData?.message)
        return res.status(400).send({ message: weatherData.message });
      await redisService.setValueToRedis(
        redisKey,
        JSON.stringify(weatherData),
        1800
      );
    }
    return res.status(200).send({ weatherData: weatherData });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
