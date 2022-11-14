const { Model, DataTypes } = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
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
    type: DataTypes.STRING(512),
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
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
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
  return bcrypt.hashSync(plainText, 10);
};

Users.validatePassword = function (password, password_hash) {
  return bcrypt.compareSync(password, password_hash);
};

Users.generateJWT = function (user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      user: user.userName,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

module.exports = { USERS_TABLE, Users, UsersSchema };
