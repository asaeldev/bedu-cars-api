const { Sequelize } = require('sequelize');
const config = require('../config/config');
const setupModels = require('../db/models/index');

const options = {
  dialect: 'postgres',
  logging: config.env === 'production' ? console.log : () => {},
};

if (config.env === 'production') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(DB_URI, options);

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
