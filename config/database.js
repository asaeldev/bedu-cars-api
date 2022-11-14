const fs = require('fs');
const config = require('./config');

module.exports = {
  development: {
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: config.dbDialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: config.dbDialect,
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {},
    },
  },
};
