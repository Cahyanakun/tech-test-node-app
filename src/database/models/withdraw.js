'use strict';
const { Model } = require('sequelize');
const balanceEnum = require('../../common/enum/balance');
const balanceTypeEnum = require('../../common/enum/balance-type');
const statusEnum = require('../../common/enum/status');
module.exports = (sequelize, DataTypes) => {
  class withdraw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  withdraw.init(
    {
      userId: DataTypes.INTEGER,
      amount: DataTypes.DOUBLE,
      status: DataTypes.INTEGER,
      statusText: {
        type: DataTypes.VIRTUAL,
        get() {
          return statusEnum.statusWithdrawAndDepo[this.getDataValue('status')];
        },
      },
    },
    {
      sequelize,
      modelName: 'withdraw',
      underscored: true,
    }
  );
  withdraw.afterUpdate(async (instance, options) => {
    if (instance.status === 1) {
      const balanceService = require('../../balance/balance.service');
      await balanceService.create({
        userId: instance.userId,
        refId: instance.id,
        refType: balanceEnum.WITHDRAW,
        type: balanceTypeEnum.KREDIT,
        amount: -instance.amount,
      });
    }
  });
  return withdraw;
};
