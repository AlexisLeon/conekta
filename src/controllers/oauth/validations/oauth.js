const { validate, Joi } = require('../../helpers/validate');

/**
 * Authenticate
 * @route POST /oauth/token
 *
 * @return {Response}
 */
module.exports = validate({
  body: Joi.object().keys({
    grant_type: Joi.string()
      .valid(['password', 'refresh_token'])
      .required(),
    username: Joi.alternatives().when('grant_type', {
      is: 'password',
      then: Joi.alternatives(
        Joi.string().email(),
        Joi.string().regex(/^(\+?52)?\d{10}$/),
      ),
    }),
    password: Joi.string().when('grant_type', {
      is: 'password',
      then: Joi.string().required(),
    }),
    refresh_token: Joi.string().when('grant_type', {
      is: 'refresh_token',
      then: Joi.string().guid().required(),
    }),
  })
    .with('password', 'username'), // checks for password, then for peer username
});
