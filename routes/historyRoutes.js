const express = require('express');
const historyController = require('../controllers/historyController');
const rateLimitMiddleware = require('../middlewares/rateLimitingMiddleware');

const router = express.Router();

router.get(
  '/:location_id',
  rateLimitMiddleware,
  historyController.getHistoricalWeatherData
);

module.exports = router;
