const express = require('express');

const cars = require('./cars.route');
const sales = require('./sales.route');
const customers = require('./customers.route');
const administrators = require('./administrators.route');

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/cars', cars);
    router.use('/sales', sales);
    router.use('/customers', customers);
    router.use('/administrators', administrators);
}    

module.exports = routerApi;