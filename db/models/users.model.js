const { Model, DataTypes } = require('sequelize');
const crypto = require('crypto');
const sequelize = require('../config/db');

const USERS_TABLE = 'users';

//Moduls for helper methods

const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const secret = require('../config').secret; 

const UsersSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z0-9_-]+$/
    }
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      len: [8, 50],
    },
  },
  password_hash: {
    type: DataTypes.CHAR(64),
    allowNull: true,
  },
  password_salt: {
    type: DataTypes.CHAR(64),
    allowNull: true,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
    validate: {
      isIn: [['administrator', 'customer']],
    },
  },
  token: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Users extends Model {
  static associate(models) {
    this.hasMany(models.Sales);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'Users',
      timestamps: true,
    };
  }
}

Users.createPassword = function(plainText) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(plainText, salt, 10000, 512, "sha512").toString("hex");
  return {salt: salt, hash: hash}
}

Users.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
  return this.password_hash === hash;
}

module.exports = { USERS_TABLE, Users, UsersSchema };
