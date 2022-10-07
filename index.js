const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const sequelize = require('./libs/sequelize');
const UsersController = require('./controllers/users.controller');
const {
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

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

app.get('/', (req, res) => {
  res.send('Welcome to Bedu Used Cars for Sale API!');
});

// Routes for customers model.
// Refactor this with Express Router
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

app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(config.port, () => {
  console.log('App running on port:', config.port);
});
