const { Model, DataTypes } = require('sequelize');

const BRANDS_TABLE = 'brands';

const BrandsSchema = {
  id: {
    type: DataTypes.SMALLINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Brands extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRANDS_TABLE,
      modelName: 'Brands',
      timestamps: false,
    };
  }
}

module.exports = {
  BRANDS_TABLE,
  BrandsSchema,
  Brands,
};
