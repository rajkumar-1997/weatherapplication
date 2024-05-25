const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.post('/', locationController.addLocation);
router.get('/', locationController.getAllLocations);
router.get('/:location_id', locationController.getLocation);
router.put('/:location_id', locationController.updateLocation);
router.delete('/:location_id', locationController.deleteLocation);

module.exports = router;
