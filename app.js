const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/envConfig');
const { connectDB } = require('./database/dbConfig');
const locationRoutes = require('./routes/locationRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const historyRoutes = require('./routes/historyRoutes');
const { redisClient } = require('./thirdParty/redis');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/locations', locationRoutes);
app.use('/weather', weatherRoutes);
app.use('/history', historyRoutes);
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from express app' });
});
connectDB();

const startServer = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to the Redis');
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('unable to connect redis:', error);
  }
};
startServer();
