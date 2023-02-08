'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.account);
      // define association here
    }
  }
  user.init(
    {
      accountId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      code: DataTypes.STRING,
      bod: DataTypes.DATE,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
    }
  );

  user.afterCreate(async (instance, options) => {
    if (instance.id < 10) {
      await instance.update({ code: 'CUST00' + instance.id });
    } else if (instance.id < 100) {
      await instance.update({ code: 'CUST0' + instance.id });
    } else {
      await instance.update({ code: 'CUST' + instance.id });
    }
  });

  return user;
};
