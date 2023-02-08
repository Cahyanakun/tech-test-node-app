'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  balance.init(
    {
      userId: DataTypes.INTEGER,
      refId: DataTypes.INTEGER,
      refType: DataTypes.STRING,
      type: DataTypes.ENUM('D', 'K'),
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: 'balance',
      underscored: true,
    }
  );
  return balance;
};
