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
    const admin = {
      email: 'admin1@mailinator.com',
      password: 'p@ssword123',
      isAdmin: true,
    };
    await account.create(
      {
        ...admin,
        admin: {
          fullName: 'Admin 1',
          bod: '1990-01-01',
          address: 'Jl. ABC',
        },
      },
      { include: 'admin' }
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
