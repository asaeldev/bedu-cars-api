
const router = require('express').Router();
const {UsersController} = require('../controllers/users.controller');

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

router.post('/login', async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const token = await usersController.login(userName, password, role = 'customer');
    if (!token) {
      return res.status('404').json({
        message: 'Credentials are not correct, please verify them and try again.'
      });
    }

    return res.status(200).json({
      success: true,
      token: token
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;