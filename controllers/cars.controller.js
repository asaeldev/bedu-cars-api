const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CarsController {
  constructor() {}

  async all() {
    return await models.Cars.findAll();
  }

  async findOne(id) {
    const car = await models.Cars.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      throw new boom.notFound('Car was not found.');
    }

    return car;
  }

  async create(data) {
    try {
      return models.Cars.create(data);
    } catch (error) {
      throw new boom.internal('Internal Server Error');
    }
  }

  async update(id, data) {
    try {
      return await models.Cars.update(data, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new boom.internal('Internal Server Error');
    }
  }

  async delete(id) {
    const car = await this.findOne(id);
    const destroyed = await models.Cars.destroy({ where: { id: car.id } });
    return destroyed;
  }
}

module.exports = CarsController;
