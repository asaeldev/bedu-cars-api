
const router = require('express').Router();
const { UsersController } = require('../controllers/users.controller');
const usersController = new UsersController();

router.get('/', async (req, res) => {
  const administrators = await usersController.all('administrator');
  return res.status(200).json(administrators);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const administrator = await usersController.findOne(id, 'administrator');
    return res.status(200).json(administrator);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
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

router.patch('/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const rowsUpdated = await usersController.update(id, data, 'administrator');
    const administrator = await usersController.findOne(id, 'administrator');
    return res.status(200).json({
      updated: rowsUpdated > 0,
      data: administrator,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await usersController.delete(id, 'administrator');
    return res.status(200).json({
      deleted: deleted > 0,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
