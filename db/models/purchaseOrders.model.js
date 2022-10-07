const { Model, DataTypes } = require('sequelize');

const PURCHASE_ORDERS_TABLE = 'purchase_orders';

const PurchaseOrdersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.SMALLINT,
    default: 1,
    min: 1,
    max: 3,
  },
};

class PurchaseOrders extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_ORDERS_TABLE,
      modelName: 'PurchaseOrders',
      timestamps: true,
    };
  }
}

module.exports = {
  PURCHASE_ORDERS_TABLE,
  PurchaseOrders,
  PurchaseOrdersSchema,
};
