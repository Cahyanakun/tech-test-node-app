'use strict';
const { Model } = require('sequelize');
const dayjs = require('dayjs');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.car);
      transaction.belongsTo(models.leasing);
    }
  }
  transaction.init(
    {
      userId: DataTypes.INTEGER,
      carId: DataTypes.INTEGER,
      leasingId: DataTypes.INTEGER,
      countTerm: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'transaction',
      underscored: true,
    }
  );
  transaction.afterCreate(async (instance, options) => {
    const transactionPaymentService = require('../../transaction-payment/transaction-payment.service');
    const carService = require('../../car/car.service');
    const leasingService = require('../../leasing/leasing.service');

    const car = await carService.findOne({ where: { id: instance.carId } });
    const leasing = await leasingService.findOne({ where: { id: instance.leasingId } });
    const interest = (leasing.rate / 100) * (car.price / 12);
    const instalement = car.price / 12 + interest;

    // console.log(dayjs().add(0, 'month').endOf('days').format('YYYY-MM-DD'));Ż

    for (let index = 0; index < instance.countTerm; index++) {
      await transactionPaymentService.create({
        userId: instance.userId,
        transactionId: instance.id,
        invoiceCode: 'INV00' + (index + 1),
        amount: instalement,
        term: index + 1,
        startDateInvoice: dayjs().add(index, 'months').endOf('days').format('YYYY-MM-DD'),
        endDateInvoice: dayjs()
          .add(index + 1, 'months')
          .endOf('days')
          .format('YYYY-MM-DD'),
      });
    }
  });
  return transaction;
};
