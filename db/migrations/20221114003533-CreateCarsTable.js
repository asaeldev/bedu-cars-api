'use strict';

const { CARS_TABLE, CarsSchema } = require('../models/cars.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CARS_TABLE, CarsSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CARS_TABLE);
  },
};
