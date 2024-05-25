const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/envConfig');
const { connectDB } = require('./database/dbConfig');
const locationRoutes = require('./routes/locationRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/locations', locationRoutes);
app.get('/api/test', (req, res) => {
  res.status(200).send({ message: 'Hello from express app' });
});

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
