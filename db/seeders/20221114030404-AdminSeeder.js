'use strict';

const config = require('../../config/config');
const { USERS_TABLE, Users } = require('../models/users.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = Users.createPassword(config.initialPassword);

    await queryInterface.bulkInsert(
      USERS_TABLE,
      [
        {
          name: 'Dory Paulitschke',
          userName: 'dpaulitschke0',
          email: 'dpaulitschke0@usa.gov',
          password: hash,
          role: 'administrator',
          createdAt: '2021-11-20',
          updatedAt: '2022-09-15',
        },
        {
          name: 'Ira Keymer',
          userName: 'ikeymer1',
          email: 'ikeymer1@goodreads.com',
          password: hash,
          role: 'administrator',
          createdAt: '2022-06-20',
          updatedAt: '2022-05-24',
        },
        {
          name: 'Puff Beneix',
          userName: 'pbeneix2',
          email: 'pbeneix2@kickstarter.com',
          password: hash,
          role: 'administrator',
          createdAt: '2022-09-24',
          updatedAt: '2021-12-16',
        },
        {
          name: 'Anselm Tyt',
          userName: 'atyt3',
          email: 'atyt3@furl.net',
          password: hash,
          role: 'administrator',
          createdAt: '2022-08-01',
          updatedAt: '2022-07-17',
        },
        {
          name: "Jamie O'Curran",
          userName: 'jocurran4',
          email: 'jocurran4@dropbox.com',
          password: hash,
          role: 'administrator',
          createdAt: '2021-11-15',
          updatedAt: '2022-05-07',
        },
      ],
      { individualHooks: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
