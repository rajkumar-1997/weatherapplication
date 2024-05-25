const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbConfig');

const Location = sequelize.define('Location', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Location;
