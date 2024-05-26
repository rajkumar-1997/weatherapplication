const Location = require('../models/locationModel');
exports.addLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const LocationExists = await Location.findOne({ where: { name } });
    if (LocationExists)
      return res.status(409).send({ message: 'location already exists' });
    const addedLocation = await Location.create({
      name,
      latitude,
      longitude,
    });
    res
      .status(200)
      .send({ message: 'location added successfully', addedLocation });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const allLocations = await Location.findAll();
    res.status(200).send({ message: 'all locations retrived', allLocations });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const locationId = req.params.location_id;
    if (!locationId)
      return res.status(400).send({ message: 'Required params missing' });
    const location = await Location.findByPk(locationId, { raw: true });
    console.log('location froml', location);
    if (!location)
      return res.status(404).send({ message: 'location not found' });
    return res.status(200).send(location);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
exports.updateLocation = async (req, res) => {
  try {
    const locationId = req.params.location_id;
    const { name, latitude, longitude } = req.body;
    const updatedData = { name, latitude, longitude };
    const [updatedRowCount, updatedLocation] = await Location.update(
      updatedData,
      {
        where: { id: locationId },
        returning: true,
      }
    );
    if (updatedRowCount === 0) {
      return res.status(404).send({ message: 'Location not found' });
    }
    res.status(200).send({ message: 'Location data updated', updatedLocation });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.location_id;
    if (!locationId)
      return res.status(400).send({ message: 'Required params missing' });
    const location = await Location.findByPk(locationId);
    if (!location)
      return res.status(404).send({ message: 'location not found' });
    await location.destroy();
    res.status(200).send({ message: 'location deleted  successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
