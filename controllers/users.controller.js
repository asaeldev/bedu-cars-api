const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const publicAttributes = ['id', 'name', 'userName', 'email'];

class UsersController {
  constructor() {}

  async all(role = 'customer') {
    return await models.Users.findAll({
      attributes: publicAttributes,
      where: {
        role: role,
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
      return models.Users.create({ ...data, role });
    } catch (error) {
      throw new boom.internal('Internal Server Error');
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
    const user = await this.findOne(id);
    return await models.Users.destroy({
      where: { id: user.id, role },
    });
  }
}

module.exports = UsersController;
