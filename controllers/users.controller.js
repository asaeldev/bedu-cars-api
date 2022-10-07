const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersController {
  constructor() {}

  async all(role = 'customer') {
    return await models.Users.findAll({
      where: {
        role: role,
      },
    });
  }

  async findOne(id, role = 'customer') {
    const user = await models.Users.findOne({
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
}

module.exports = UsersController;
