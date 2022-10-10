const config = require('./config/config');
const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const cors = require('cors');
const {
  ormErrorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const routerApi = require('./routes');

const app = express();

const allowedDomains = ['https://localhost:3000'];

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

require('./utils/auth/index');

app.get('/', (req, res) => {
  res.send('Welcome to Bedu Used Cars for Sale API!');
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bedu Used Cars for Sale API',
      version: '1.0.0',
      description: 'BEDU Backend Fundamentals project. Used Cars for Sale API.',
    },
    servers: [
      {
        url: 'https://bedu-cars-db.herokuapp.com/',
      },
    ],
  },
  apis: ['./routes/*.route.js'],
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

routerApi(app);

app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(config.port, () => {
  console.log('App running on port:', config.port);
});
