'use strict';

const { account } = require('../../database/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const user = {
      email: 'bob@mailinator.com',
      password: 'p@ssword123',
      isAdmin: false,
    };
    await account.create(
      {
        ...user,
        user: {
          fullName: 'Bob Richard',
          bod: '1990-01-02',
          address: 'Jl. ABC No.12',
        },
      },
      { include: 'user' }
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
