const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const {
  ormErrorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const sequelize = require('./libs/sequelize');
const routerApi = require('./routes');

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

routerApi(app);

app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(config.port, () => {
  console.log('App running on port:', config.port);
});
