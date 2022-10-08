require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUri: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
