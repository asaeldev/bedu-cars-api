const express = require('express');
const carsRouter = require('./cars.route');
const salesRouter = require('./sales.route');
const customersRouter = require('./customers.route');
const administratorsRouter = require('./administrators.route');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/cars', carsRouter);
  router.use('/customers', customersRouter);
  router.use('/administrators', administratorsRouter);
  router.use('/sales', salesRouter);
};

module.exports = routerApi;
