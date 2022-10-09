const express = require('express');
const cars = require('./cars.route');
const sales = require('./sales.route');
const user = require('./users.route');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/cars', cars);
  router.use('/customers', user);
  router.use('/administrators', user);
  router.use('/sales', sales);
};

module.exports = routerApi;
