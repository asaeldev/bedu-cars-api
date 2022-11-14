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
    validate: {
      isNumeric: true,
      len: [4, 4],
    },
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

class Cars extends Model {
  static associate(models) {
    this.hasMany(models.Sales);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARS_TABLE,
      modelName: 'Cars',
      timestamps: true,
    };
  }
}

module.exports = { CARS_TABLE, CarsSchema, Cars };
