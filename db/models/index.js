const { Users, UsersSchema } = require('./users.model');
const { Cars, CarsSchema } = require('./cars.model');
const { Sales, SalesSchema } = require('./sales.model');

function setupModels(sequelize) {
  Users.init(UsersSchema, Users.config(sequelize));
  Cars.init(CarsSchema, Cars.config(sequelize));
  Sales.init(SalesSchema, Sales.config(sequelize));
  Users.associate(sequelize.models);
  Sales.associate(sequelize.models);
  Cars.associate(sequelize.models);

  Sales.addHook('beforeCreate', 'setTotal', async (sale, options) => {
    const car = await sequelize.models.Cars.findByPk(sale.CarId);
    sale.total = parseFloat(sale.quantity * car.price).toFixed(2);
  });
}

module.exports = setupModels;
