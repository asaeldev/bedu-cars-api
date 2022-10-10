const router = require('express').Router();
const { UsersController } = require('../controllers/users.controller');

const usersController = new UsersController();

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Lists all the customers
 *     description: Get the entire list of customers
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the entire list of customers.
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Select a specific customer
 *     description: Get the information of a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the customer.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the information of a customer.
 */

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create a new customer
 *     description: Add a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the Customer.
 *                 example: Ramiro Hernandez
 *               UserName:
 *                 type: string
 *                 description: Customer Username
 *                 example: Ramiro_Hernandez
 *               email:
 *                 type: string
 *                 description: Email of the Customer
 *                 example: Ramiro@mail.com
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Registers a new customer.
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Deletes a customer register
 *     description: Deletes a customer register specified by ID
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
 *                 description: Name of the user
 *                 example: evelyn
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Deletes a car sale.
 */

router.get('/', async (req, res) => {
  const customers = await usersController.all();

  return res.status(200).json(customers);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const customer = await usersController.findOne(id);
    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const data = req.body;

  try {
    const customer = await usersController.create(data);
    return res.status(201).json({
      created: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const updatedRecords = await usersController.update(id, data);
    const customer = await usersController.findOne(id);
    return res.status(200).json({
      updated: updatedRecords > 0,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await usersController.delete(id);
    return res.status(200).json({
      deleted: deletedRows > 0,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await usersController.login(email, password, 'customer');
    if (!token) {
      return res.status(404).json({
        message:
          'Credentials are not correct, please verify them and try again.',
      });
    }

    return res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
