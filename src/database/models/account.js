'use strict';
const { Model } = require('sequelize');
const security = require('../../common/helper/security');

module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      account.hasOne(models.user);
      account.hasOne(models.admin);
    }
  }
  account.init(
    {
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const hashedPassword = security.hash(value);
          this.setDataValue('password', hashedPassword);
        },
      },
      isAdmin: DataTypes.BOOLEAN,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'account',
      underscored: true,
    }
  );
  return account;
};
