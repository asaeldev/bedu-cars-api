const {
  UsersController,
  signUp,
  logIn,
} = require('../controllers/users.controller');
const router = require('express').Router();

const usersController = new UsersController();

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

router.post('/signUp', signUp);
router.post('/logIn', logIn);

module.exports = router;