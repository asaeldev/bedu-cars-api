const { Model, DataTypes, Sequelize } = require('sequelize');

const CARS_TABLE = 'cars';

const CarsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.CHAR(4),
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [4, 4],
    },
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Cars extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARS_TABLE,
      modelName: 'Car',
      timestamps: false,
    };
  }
}

module.exports = { CARS_TABLE, Cars, CarsSchema };
