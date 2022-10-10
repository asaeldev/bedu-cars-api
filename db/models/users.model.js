const { Model, DataTypes } = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');

const USERS_TABLE = 'users';

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
      is: /^[a-zA-Z0-9_-]+$/,
    },
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
    type: DataTypes.TEXT(512),
    allowNull: true,
  },
  password_salt: {
    type: DataTypes.STRING,
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

Users.createPassword = function (plainText) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(plainText, salt, 10000, 512, 'sha512')
    .toString('hex');
  return { salt: salt, hash: hash };
};

Users.validatePassword = function (password, password_hash, salt) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return password_hash === hash;
};

Users.generateJWT = function (user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  console.log('User from generateJWT: ', user)
  return jwt.sign({
    user: user.userName,
    exp: parseInt(exp.getTime() / 1000)
  }, secret);
}


module.exports = { USERS_TABLE, Users, UsersSchema };
