const joi = require('joi');

const locationShcema = joi.object({
  name: joi.string().required(),
  latitude: joi.number().min(-90).max(90).required(),
  longitude: joi.number().min(-180).max(180).required(),
});

const validateLocation = async (req, res, next) => {
  const { error } = await locationShcema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
module.exports = validateLocation;
