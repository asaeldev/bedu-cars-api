const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

function checkRoles(...roles) {
  return async (req, res, next) => {
    const { user: userName } = req.user;
    const user = await models.Users.findOne({ where: { userName: userName } });
    if (roles.includes(user.role)) {
      next();
    } else {
      next(
        boom.forbidden(
          'User does not have permissions to perform the requested operation.'
        )
      );
    }
  };
}

module.exports = { checkRoles };
