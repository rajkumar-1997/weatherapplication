const { createClient } = require('redis');
const {
  redisHost,
  redisPort,
  redisPassword,
  redisUsername,
} = require('../config/envConfig');
const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
  password: redisPassword,
  username: redisUsername,
});

redisClient.on('error', (error) => {
  console.log('Redis Error:', error);
});

const getValueFromRedis = async (key) => {
  try {
    const value = await redisClient.get(key);
    console.log(value);
    if (value) return value;
    return null;
  } catch (error) {
    return error;
  }
};

const setValueToRedis = async (key, value, ttl = -1) => {
  try {
    if (ttl == -1) {
      await redisClient.set(key, value);
    } else {
      await redisClient.set(key, value, { EX: ttl });
    }
  } catch (error) {
    return error;
  }
};

module.exports = { redisClient, getValueFromRedis, setValueToRedis };
