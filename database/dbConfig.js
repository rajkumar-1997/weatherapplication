const Sequelize = require('sequelize');
const {
  dbName,
  dbPassword,
  dbUserName,
  dbHost,
} = require('../config/envConfig');

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  dbHost,
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Data base connected');
    await sequelize.sync();
  } catch (error) {
    console.log('DataBase Error:', error);
  }
};

module.exports = { connectDB, sequelize };
