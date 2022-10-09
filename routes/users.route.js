const router = require('express').Router();
const usersController = new UsersController();
const UsersController = require('../controllers/users.controller');
const { signUp, logIn } = require('../controllers/users.controller');

router.get('/customers', async (req, res) => {
  const customers = await usersController.all();

  return res.status(200).json(customers);
});

router.get('/customers/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const customer = await usersController.findOne(id);
    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.post('/customers', async (req, res, next) => {
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

router.patch('/customers/:id', async (req, res, next) => {
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

router.delete('/customers/:id', async (req, res, next) => {
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

// Routes for administrators.
router.get('/administrators', async (req, res) => {
  const administrators = await usersController.all('administrator');
  return res.status(200).json(administrators);
});

router.get('/administrators/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const administrator = await usersController.findOne(id, 'administrator');
    return res.status(200).json(administrator);
  } catch (error) {
    next(error);
  }
});

router.post('/administrators', async (req, res, next) => {
  const data = req.body;

  try {
    const administrator = await usersController.create(data, 'administrator');
    return res.status(201).json({
      created: true,
      data: administrator,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/administrators/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const rowsUpdated = await usersController.update(id, data);
    const administrator = await usersController.findOne(id, 'administrator');
    return res.status(200).json({
      updated: rowsUpdated > 0,
      data: administrator,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/administrators/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await usersController.delete(id, 'administrator');
    return res.status(200).json({
      deleted: true,
    });
  } catch (error) {
    next(error);
  }
});
router.post('/signUp', signUp);
router.post('/logIn', logIn)

module.exports = router;