const { Model, DataTypes } = require('sequelize');

const SALES_TABLE = 'sales';

const SalesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.SMALLINT,
    defaultValue: 1,
    min: 1,
    max: 3,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Received',
    allowNull: false,
    validate: {
      isIn: [['Received', 'Processed', 'Shipped', 'Delivered', 'Canceled']],
    },
  },
  total: {
    type: DataTypes.DECIMAL,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

class Sales extends Model {
  static associate(models) {
    this.belongsTo(models.Users, {
      as: 'User',
      foreignKey: {
        allowNull: false,
      },
    });

    this.belongsTo(models.Cars, {
      as: 'Car',
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALES_TABLE,
      modelName: 'Sales',
      timestamps: true,
    };
  }
}

module.exports = {
  SALES_TABLE,
  Sales,
  SalesSchema,
};
