const { Users, UsersSchema } = require('./users.model');
const { Cars, CarSchema } = require('./cars.model');
const { Brands, BrandsSchema } = require('./brands.model');
const {
  PurchaseOrders,
  PurchaseOrdersSchema,
} = require('./purchaseOrders.model');

function setupModels(sequelize) {
  Users.init(UsersSchema, Users.config(sequelize));
  Cars.init(CarSchema, Cars.config(sequelize));
  Brands.init(BrandsSchema, Brands.config(sequelize));
  PurchaseOrders.init(PurchaseOrdersSchema, PurchaseOrders.config(sequelize));
}

module.exports = setupModels;
