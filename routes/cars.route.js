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
 *     description: Get the entire list of cars
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the list of all used cars available for sale.
 */
router.get('/', async (req, res) => {
  const cars = await carsController.all();
  return res.status(200).json(cars);
});

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   get:
 *     summary: List a specific used car by ID
 *     description: List a specific used car by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the car to retrieve
 *        schema:
 *          type: integer
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Car was found and therefore it is returned in the response.
 */
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await carsController.findOne(id);
    return res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/cars:
 *   post:
 *     security:
 *      - Bearer: []
 *     summary: Create a new car
 *     description: Create a new car. Only administrator users can perform this operation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: Car's model.
 *                 example: X5
 *               year:
 *                 type: string
 *                 description: Car's model year.
 *                 example: 2012
 *               color:
 *                 type: string
 *                 description: Car's model year.
 *                 example: White
 *               price:
 *                 type: string
 *                 description: Car's price.
 *                 example: 100000.00
 *               brand:
 *                 type: string
 *                 description: Car's brand.
 *                 example: Mazda
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: New car was successfully added and is returned in the response.
 */
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

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   patch:
 *     security:
 *      - Bearer: []
 *     summary: Update an existing car.
 *     description: Update an existing car. Only administrator users can perform this operation.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the car to update
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: Car's model.
 *                 example: X5
 *               year:
 *                 type: string
 *                 description: Car's model year.
 *                 example: 2012
 *               color:
 *                 type: string
 *                 description: Car's model year.
 *                 example: White
 *               price:
 *                 type: string
 *                 description: Car's price.
 *                 example: 100000.00
 *               brand:
 *                 type: string
 *                 description: Car's brand.
 *                 example: Mazda
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the updated resources with the changes reflected.
 */
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
/**
 * @swagger
 * /api/v1/cars:
 *   delete:
 *     security:
 *      - Bearer: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the car to delete
 *        schema:
 *          type: integer
 *     summary: Delete an existing car
 *     description: Delete an existing car from the API. Only administrator users can perform this operation.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Record was deleted from the API successfully.
 */
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
