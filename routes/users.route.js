const router = require('express').Router();
const usersController = new UsersController();
const UsersController = require('../controllers/users.controller');

router.get('/', usersController.all);
router.get('/:id', usersController.findOne);
router.post('/', usersController.create);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;