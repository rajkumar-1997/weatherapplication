const weatherApiService = require('../thirdParty/weatherApiService');
const redisService = require('../thirdParty/redis');
const Location = require('../models/locationModel');
exports.getHistoricalWeatherData = async (req, res) => {
  try {
    const locationId = req.params.location_id;
    const days = parseInt(req.query.days);
    if (!locationId || !days || ![7, 15, 30].includes(days))
      return res.status(400).send({ message: 'Invalid request parameters' });
    const location = await Location.findByPk(locationId, { raw: true });
    if (!location)
      return res.status(404).send({ message: 'location not found' });
    const latitude = location.latitude;
    const longitude = location.longitude;
    let HistoricalWeatherData;
    const redisKey = `${latitude}/${longitude}_HistoricalWeatherData_${days}`;
    const cachedWeatherHistoryData = await redisService.getValueFromRedis(
      redisKey
    );
    if (cachedWeatherHistoryData) {
      HistoricalWeatherData = JSON.parse(cachedWeatherHistoryData);
    } else {
      HistoricalWeatherData = await weatherApiService.getHistoricalWeatherData(
        latitude,
        longitude,
        days
      );
      if (HistoricalWeatherData?.message)
        return res.status(400).send({ message: HistoricalWeatherData.message });
      await redisService.setValueToRedis(
        redisKey,
        JSON.stringify(HistoricalWeatherData),
        1800
      );
    }
    return res
      .status(200)
      .send({ HistoricalWeatherData: HistoricalWeatherData });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
