const router = require('express').Router();
const boom = require('@hapi/boom');
const SalesController = require('../controllers/sales.controller');
const { UsersController } = require('../controllers/users.controller');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const salesController = new SalesController();
const usersController = new UsersController();

/**
 * @swagger
 * /api/v1/sales:
 *   get:
 *     summary: Lists all the car sales
 *     description: Get the entire list of cars sold
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the entire list of cars sold.
 */

/**
 * @swagger
 * /api/v1/sales/{id}:
 *   get:
 *     summary: Select a specific car sale
 *     description: Get the description of a car sale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the sale.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the description of a car sale.
 */

/**
 * @swagger
 * /api/v1/sales/:
 *   post:
 *     summary: Create a car sale
 *     description: Create a new car sale
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantity of cars sold.
 *                 example: 2
 *               CarId:
 *                 type: integer
 *                 description: The Numeric ID of the Car sold.
 *                 example: 1
 *               UserId:
 *                 type: integer
 *                 description: The Numeric ID of the user that made the purchase.
 *                 example: 3
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Registers a new car sale.
 */

/**
 * @swagger
 * /api/v1/sales/{id}:
 *   patch:
 *     summary: Update the status of a car sale
 *     description: Update the status of a car sale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the sale.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status of the sale.
 *                 example: Canceled
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Updates the status of a car sale
 */

/**
 * @swagger
 * /api/v1/sales{id}:
 *   delete:
 *     summary: Deletes a car sale
 *     description: Deletes a car sale specified by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the sale.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Name of the user that made the purchase
 *                 example: evelyn
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Deletes a car sale.
 */

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res) => {
    const { fields } = req.query;
    const parsedFields = fields ? fields.split(',') : null;
    const sales = await salesController.all(parsedFields);
    return res.status(200).json(sales);
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator', 'customer'),
  async (req, res, next) => {
    const { id } = req.params;
    const user = await usersController.findByUserName(req.user.user);

    try {
      let sale = await salesController.findOne(id);

      console.log(user.role, sale.User.id, user.id);
      if (user.role === 'customer' && sale.User.id !== user.id) {
        throw new boom.forbidden('You cannot access this record.');
      }

      console.log('hello');

      return res.status(200).json(sale);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator', 'customer'),
  async (req, res, next) => {
    const data = req.body;

    try {
      const sale = await salesController.create(data);
      return res.status(201).json({
        created: sale !== null,
        data: sale,
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
    const { status } = req.body;
    const { id } = req.params;

    try {
      const updatedRecords = await salesController.updateStatus(id, status);
      const sale = await salesController.findOne(id);
      return res.status(200).json({
        updated: updatedRecords > 0,
        data: sale,
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
      const deletedRows = await salesController.delete(id);
      return res.status(200).json({
        deleted: deletedRows > 0,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
