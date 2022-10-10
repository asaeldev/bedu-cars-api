const router = require('express').Router();
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const CarsController = require('../controllers/cars.controller');

const carsController = new CarsController();

/**
 * @swagger
 * /api/v1/cars:
 *   get:
 *     summary: Lists all the used cars
 *     description: Get the entire list of administrator users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the entire list of administrator users.
 */
router.get('/', async (req, res) => {
  const cars = await carsController.all();
  return res.status(200).json(cars);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await carsController.findOne(id);
    return res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    const data = req.body;

    try {
      const car = await carsController.create(data);
      return res.status(201).json({
        created: car !== null,
        data: car,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;

    try {
      const updatedRecords = await carsController.update(id, data);
      const customer = await carsController.findOne(id);
      return res.status(200).json({
        updated: updatedRecords > 0,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedRows = await carsController.delete(id);
      return res.status(200).json({
        deleted: deletedRows > 0,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
