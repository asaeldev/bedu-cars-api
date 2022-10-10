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
}

async function signUp(req, res) {
  const body = req.body;
  try {
    res.status(201).json(user);
  } catch (err) {
    if (
      ['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
        err.name
      )
    ) {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    } else {
      throw err;
    }
  }
}

async function logIn(req, res) {
  const body = req.body;
  const user = Users.findOne({ userName: body['userName'] });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.validatePassword(body['password'])) {
    return res.status(200).json({
      user: user.userName,
      email: user.email,
      token: Users.generateJWT(user),
      // mensaje: 'Welcome'
    });
  } else {
    return res.status(400).json({ mensaje: 'Incorrect Password' });
  }
}
module.exports = { UsersController, signUp, logIn };
