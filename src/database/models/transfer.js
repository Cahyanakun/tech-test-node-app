'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transfer.init({
    userId: DataTypes.INTEGER,
    transactionPaymentId: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    payAmount: DataTypes.DOUBLE,
    remainingAmount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'transfer',
    underscored: true,
  });
  return transfer;
};