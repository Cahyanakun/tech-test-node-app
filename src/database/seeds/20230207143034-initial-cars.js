'use strict';

/** @type {import('sequelize-cli').Migration} */

const { car } = require('../../database/models');

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
        brandName: 'Toyota',
        groupModelName: 'Avanza',
        modelName: '1.3 E MT',
        year: '2015',
        price: 115000000,
      },
      {
        id: 2,
        brandName: 'Toyota',
        groupModelName: 'Agya',
        modelName: '1.0 L MT',
        year: '2015',
        price: 88500000,
      },
      {
        id: 3,
        brandName: 'VolksWagen',
        groupModelName: 'Tiguan',
        modelName: '1.4 TFSI AT',
        year: '2015',
        price: 213000000,
      },
      {
        id: 4,
        brandName: 'BMW',
        groupModelName: 'X1',
        modelName: 'F48 sDrive18i Xline Executive AT',
        year: '2016',
        price: 410000000,
      },
      {
        id: 5,
        brandName: 'Honda',
        groupModelName: 'HR-V',
        modelName: '1.8 E Prestige',
        year: '2016',
        price: 259000000,
      },
      {
        id: 6,
        brandName: 'Lexus',
        groupModelName: 'LX',
        modelName: '570 J200 SUV AT',
        year: '2009',
        price: 1250000000,
      },
    ];
    for (let index = 0; index < data.length; index++) {
      await car.create(data[index]);
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
