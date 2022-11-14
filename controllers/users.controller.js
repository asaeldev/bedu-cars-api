const boom = require('@hapi/boom');
const { Users } = require('../db/models/users.model');
const { models } = require('../libs/sequelize');

const publicAttributes = ['id', 'name', 'userName', 'email'];

class UsersController {
  constructor() {}

  async all(role = 'customer') {
    return await models.Users.findAll({
      attributes: publicAttributes,
      where: {
        role,
      },
    });
  }

  async findOne(id, role = 'customer') {
    const user = await models.Users.findOne({
      attributes: publicAttributes,
      where: { id, role },
    });

    if (!user) {
      throw new boom.notFound('User was not found.');
    }

    return user;
  }

  async create(data, role = 'customer') {
    try {
      const user = await models.Users.create({
        ...data,
        role,
      });

      return this.findOne(user.id, role);
    } catch (error) {
      throw new boom.internal('Internal error occurred');
    }
  }

  async update(id, data, role = 'customer') {
    try {
      return await models.Users.update(data, {
        where: {
          id,
          role,
        },
      });
    } catch (error) {
      throw new boom.internal('Internal Server Error');
    }
  }

  async delete(id, role = 'customer') {
    const user = await this.findOne(id, role);
    return await models.Users.destroy({
      where: { id: user.id, role },
    });
  }

  async login(userName, password, role = 'customer') {
    const user = await Users.findOne({ where: { email: userName } });
    if (user === null) {
      throw new boom.notFound('User not found');
    }
    if (Users.validatePassword(password, user.password)) {
      return Users.generateJWT(user);
    } else {
      return null;
    }
  }
}

module.exports = { UsersController, publicAttributes };
