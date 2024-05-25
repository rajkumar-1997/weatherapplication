const Sequelize = require('sequelize');
const {
  DBName,
  DBPassword,
  DBUserName,
  DBHost,
} = require('../config/envConfig');

const sequelize = new Sequelize(DBName, DBUserName, DBPassword, {
  DBHost,
  dialect: 'postgres',
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
