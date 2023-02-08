'use strict';
const { Model } = require('sequelize');
const statusEnum = require('../../common/enum/status');
module.exports = (sequelize, DataTypes) => {
  class transaction_payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_payment.hasOne(models.transfer, {
        as: 'payment',
        foreignKey: 'transactionPaymentId',
      });
    }
  }
  transaction_payment.init(
    {
      userId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
      invoiceCode: DataTypes.STRING,
      amount: DataTypes.DOUBLE,
      term: DataTypes.INTEGER,
      startDateInvoice: DataTypes.DATE,
      endDateInvoice: DataTypes.DATE,
      status: DataTypes.INTEGER,
      statusText: {
        type: DataTypes.VIRTUAL,
        get() {
          return statusEnum.statusTransaction[this.getDataValue('status')];
        },
      },
    },
    {
      sequelize,
      modelName: 'transaction_payment',
      underscored: true,
    }
  );
  return transaction_payment;
};
