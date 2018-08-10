const { body } = require('express-validator/check');

/**
 * Register - Validate register route
 * @route POST /register/verify/email
 *
 * @return {Response}
 */
module.exports = [
  body('email')
    .exists()
    .withMessage('email param is required.')
    .isEmail()
    .withMessage('Invalid email param: must be a valid email.'),
];
