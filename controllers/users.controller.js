const boom = require('@hapi/boom');
const { Users } = require('../db/models/users.model');
const { models } = require('../libs/sequelize');

const publicAttributes = ['id', 'name', 'userName', 'email'];

class UsersController {
  constructor() { }

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
      const { password } = data;
      const { salt, hash } = Users.createPassword(password);
      return await models.Users.create({
        ...data,
        role,
        password_hash: hash,
        password_salt: salt,
      });
    } catch (error) {
      throw new boom.internal(error.message);
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

  async login(userName, password, role = 'customer') {
    const user = await Users.findOne({ userName });
    console.log('User:', user);
    if (user === null) {
      throw new boom.notFound('User not found');
    }
    if (Users.validatePassword(password, user.password_hash, user.password_salt)) {
      return Users.generateJWT(user);
    } else {
      return null;
    }
  }
}

module.exports = { UsersController };
