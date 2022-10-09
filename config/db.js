const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize(
  'database',
  'userName', 
  'password',
{
  host: 'host',
  dialect: 'postgres',
  native: true,
  ssl: true
});

module.exports = sequelize