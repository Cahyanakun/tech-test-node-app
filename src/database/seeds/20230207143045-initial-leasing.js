'use strict';

/** @type {import('sequelize-cli').Migration} */

const { leasing } = require('../../database/models');

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
    const data = [
      {
        id: 1,
        code: 'L001',
        leasingName: 'Clipan Finance',
        rate: 12,
        term: 12,
      },
      {
        id: 2,
        code: 'L002',
        leasingName: 'BFI',
        rate: 10,
        term: 6,
      },
      {
        id: 3,
        code: 'L003',
        leasingName: 'SMS Finance',
        rate: 15,
        term: 12,
      },
    ];
    for (let index = 0; index < data.length; index++) {
      await leasing.create(data[index]);
    }
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
