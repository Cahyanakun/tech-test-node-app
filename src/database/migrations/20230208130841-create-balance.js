'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      ref_id: {
        type: Sequelize.INTEGER,
      },
      ref_type: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('D', 'K'),
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('balances', {
      fields: ['user_id', 'ref_id', 'ref_type'],
      type: 'unique',
      name: 'balances_uq_constraint',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('balances');
  },
};
