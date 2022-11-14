'use strict';

const { USERS_TABLE, UsersSchema } = require('../models/users.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USERS_TABLE, UsersSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USERS_TABLE);
  },
};
