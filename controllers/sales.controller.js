const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const {
  publicAttributes: userAttributes,
} = require('../controllers/users.controller');

const publicAttributes = ['id', 'quantity', 'status', 'total'];

class SalesController {
  constructor() {}

  async all(fields = null) {
    const attributes = fields !== null ? fields : publicAttributes;
    return await models.Sales.findAll({
      attributes: attributes,
      include: [
        'Car',
        {
          model: models.Users,
          as: 'User',
          attributes: userAttributes,
        },
      ],
    });
  }

  async findOne(id) {
    const sale = await models.Sales.findOne({
      attributes: publicAttributes,
      where: {
        id,
      },
      include: [
        'Car',
        {
          model: models.Users,
          as: 'User',
          attributes: userAttributes,
        },
      ],
    });

    if (!sale) {
      throw new boom.notFound('Sales document was not found.');
    }

    return sale;
  }

  async create(data) {
    try {
      return models.Sales.create(data);
    } catch (error) {
      throw new boom.internal('Internal Server Error');
    }
  }

  async updateStatus(id, status) {
    try {
      return await models.Sales.update(
        { status },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw new boom.internal('Internal Server Error');
    }
  }

  async delete(id) {
    const sale = await this.findOne(id);
    return await models.Sales.destroy({
      where: {
        id: sale.id,
      },
    });
  }
}

module.exports = SalesController;
