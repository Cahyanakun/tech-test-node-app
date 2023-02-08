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
      bod: DataTypes.DATE,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
    }
  );
  return user;
};
