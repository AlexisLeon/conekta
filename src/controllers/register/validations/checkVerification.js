const { check } = require('express-validator/check');

/**
 * Check Verification - Validate register route
 * @route POST /register/verify/check
 *
 * @return {Response}
 */
module.exports = [
  check('requestId')
    .exists()
    .withMessage('requestId param is required.'),

  check('code')
    .exists()
    .withMessage('code param is required.')
    .isLength({ min: 6, max: 6 })
    .withMessage('Invalid code param: must be 6 digits number.')
    .isNumeric()
    .withMessage('Invalid code param: must be 6 digits number.'),
];
