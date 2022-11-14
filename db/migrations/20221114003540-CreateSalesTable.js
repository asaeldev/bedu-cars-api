'use strict';

const { SALES_TABLE, SalesSchema } = require('../models/sales.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(SALES_TABLE, SalesSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(SALES_TABLE);
  },
};
