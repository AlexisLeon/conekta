const { check } = require('express-validator/check');

/**
 * Request verification - Validate register route
 * @route POST /register/verify
 *
 * @return {Response}
 */
module.exports = [
  check('requestId')
    .optional({
      nullable: true,
      checkFalsy: true,
    })
    .not()
    .isInt()
    .withMessage('requestId param is required.'),

  check('number')
    .exists()
    .withMessage('number param is required.')
    // .isMobilePhone('es-MX')
    // .matches(/^(\+?52)?(1|01)?[0-9]{2,3}\d{8}$/)
    .matches(/^(\+?52)?\d{10}$/)
    .withMessage('Invalid number param: must be a valid phone number.'),

  check('country')
    .exists()
    .withMessage('country param is required.')
    .isLength({ min: 2, max: 2 })
    .withMessage('Invalid country param: must be 2 digit ISO 3166-1.')
    .equals('MX')
    .withMessage('Invalid country param: must be MX.'),

  check('lang')
    .exists()
    .withMessage('lang param is required.')
    .matches(/^(es-mx)|(en-us)$/)
    .withMessage('Invalid lang param: must be en-us or es-mx.'),
];
