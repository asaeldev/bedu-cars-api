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

const sequelize = new Sequelize(config.dbUri, options);

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
