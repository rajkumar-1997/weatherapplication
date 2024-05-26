const express = require('express');
const locationController = require('../controllers/locationController');
const validateLocation = require('../middlewares/dataValidateMiddleware');
const router = express.Router();

router.post('/', validateLocation, locationController.addLocation);
router.get('/', locationController.getAllLocations);
router.get('/:location_id', locationController.getLocation);
router.put(
  '/:location_id',
  validateLocation,
  locationController.updateLocation
);
router.delete('/:location_id', locationController.deleteLocation);

module.exports = router;
