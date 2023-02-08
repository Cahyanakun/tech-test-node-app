'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leasing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  leasing.init(
    {
      code: DataTypes.STRING,
      leasingName: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      term: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'leasing',
      underscored: true,
    }
  );
  return leasing;
};
