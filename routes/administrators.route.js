const router = require('express').Router();

const {
    UsersController,
    signUp,
    logIn,
} = require('../controllers/users.controller');

const usersController = new UsersController();

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
router.post('/logIn', logIn);

module.exports = router;