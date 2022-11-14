const router = require('express').Router();
const { UsersController } = require('../controllers/users.controller');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const usersController = new UsersController();

/**
 * @swagger
 * /api/v1/administrators:
 *   get:
 *     summary: Lists all the administrator users
 *     description: Get the entire list of administrator users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns the entire list of administrator users.
 */

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    try {
      const administrators = await usersController.all('administrator');
      return res.status(200).json(administrators);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const administrator = await usersController.findOne(id, 'administrator');
      return res.status(200).json(administrator);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
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
      const rowsUpdated = await usersController.update(
        id,
        data,
        'administrator'
      );
      const administrator = await usersController.findOne(id, 'administrator');
      return res.status(200).json({
        updated: rowsUpdated > 0,
        data: administrator,
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
      const deleted = await usersController.delete(id, 'administrator');
      return res.status(200).json({
        deleted: deleted > 0,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await usersController.login(email, password, 'administrator');
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
