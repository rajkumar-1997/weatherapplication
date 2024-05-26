const express = require('express');
const weatherController = require('../controllers/weatherController');
const rateLimitMiddleware = require('../middlewares/rateLimitingMiddleware');
const router = express.Router();

router.get(
  '/:location_id',
  rateLimitMiddleware,
  weatherController.getWeatherForcast
);

module.exports = router;
