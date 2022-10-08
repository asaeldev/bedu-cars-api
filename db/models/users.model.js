const { Model, DataTypes } = require('sequelize');

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

module.exports = { USERS_TABLE, Users, UsersSchema };
