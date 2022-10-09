const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const sequelize = require('./libs/sequelize');
const UsersController = require('./controllers/users.controller');
const CarsController = require('./controllers/cars.controller');
const SalesController = require('./controllers/sales.controller');
const {
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const routes = require('./routes')

const app = express();

const allowedDomains = ['https://localhost:8080'];

const corsSettings = {
  origin: (origin, callback) => {
    if (allowedDomains.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Domain not allowed.', false));
    }
  },
};

app.use(express.json());
app.use(cors(corsSettings));
app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Welcome to Bedu Used Cars for Sale API!');
});

// Refactor all the routes with Express Router

// Routes for customers model
const usersController = new UsersController();

app.get('/customers', async (req, res) => {
  const customers = await usersController.all();

  return res.status(200).json(customers);
});

app.get('/customers/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const customer = await usersController.findOne(id);
    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

app.post('/customers', async (req, res, next) => {
  const data = req.body;

  try {
    const customer = await usersController.create(data);
    return res.status(201).json({
      created: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
});

app.patch('/customers/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const updatedRecords = await usersController.update(id, data);
    const customer = await usersController.findOne(id);
    return res.status(200).json({
      updated: updatedRecords > 0,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/customers/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await usersController.delete(id);
    return res.status(200).json({
      deleted: deletedRows > 0,
    });
  } catch (error) {
    next(error);
  }
});

// Routes for administrators.
app.get('/administrators', async (req, res) => {
  const administrators = await usersController.all('administrator');
  return res.status(200).json(administrators);
});

app.get('/administrators/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const administrator = await usersController.findOne(id, 'administrator');
    return res.status(200).json(administrator);
  } catch (error) {
    next(error);
  }
});

app.post('/administrators', async (req, res, next) => {
  const data = req.body;

  try {
    const administrator = await usersController.create(data, 'administrator');
    return res.status(201).json({
      created: true,
      data: administrator,
    });
  } catch (error) {
    next(error);
  }
});

app.patch('/administrators/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const rowsUpdated = await usersController.update(id, data);
    const administrator = await usersController.findOne(id, 'administrator');
    return res.status(200).json({
      updated: rowsUpdated > 0,
      data: administrator,
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/administrators/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await usersController.delete(id, 'administrator');
    return res.status(200).json({
      deleted: true,
    });
  } catch (error) {
    next(error);
  }
});

// Routes for cars model
const carsController = new CarsController();

app.get('/cars', async (req, res) => {
  const cars = await carsController.all();
  return res.status(200).json(cars);
});

app.get('/cars/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await carsController.findOne(id);
    return res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});

app.post('/cars', async (req, res, next) => {
  const data = req.body;

  try {
    const car = await carsController.create(data);
    return res.status(201).json({
      created: car !== null,
      data: car,
    });
  } catch (error) {
    next(error);
  }
});

app.patch('/cars/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const updatedRecords = await carsController.update(id, data);
    const customer = await carsController.findOne(id);
    return res.status(200).json({
      updated: updatedRecords > 0,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/cars/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await carsController.delete(id);
    return res.status(200).json({
      deleted: deletedRows > 0,
    });
  } catch (error) {
    next(error);
  }
});

// Routes for Sales model
const salesController = new SalesController();

app.get('/sales', async (req, res) => {
  const { fields } = req.query;
  const parsedFields = fields ? fields.split(',') : null;
  const sales = await salesController.all(parsedFields);
  return res.status(200).json(sales);
});

app.get('/sales/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await salesController.findOne(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
});

app.post('/sales', async (req, res, next) => {
  const data = req.body;

  try {
    const sale = await salesController.create(data);
    return res.status(201).json({
      created: sale !== null,
      data: sale,
    });
  } catch (error) {
    next(error);
  }
});

app.patch('/sales/:id', async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedRecords = await salesController.updateStatus(id, status);
    const sale = await salesController.findOne(id);
    return res.status(200).json({
      updated: updatedRecords > 0,
      data: sale,
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/sales/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await salesController.delete(id);
    return res.status(200).json({
      deleted: deletedRows > 0,
    });
  } catch (error) {
    next(error);
  }
});

app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(config.port, () => {
  console.log('App running on port:', config.port);
});
