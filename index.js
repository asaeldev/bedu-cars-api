const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const sequelize = require('./libs/sequelize');
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

// Body Parser

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuration of routes

app.use('/v1', require('./routes'));

// Starting Server

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})