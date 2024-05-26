const express = require('express');
const weatherController = require('../controllers/weatherController');
const router = express.Router();

router.get('/:location_id', weatherController.getWeatherForcast);

module.exports = router;
