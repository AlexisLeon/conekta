const { validate, Joi } = require('../../helpers/validate');

/**
 * Register - Validate register route
 * @route POST /register
 *
 * @return {Response}
 */
module.exports = validate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
});
