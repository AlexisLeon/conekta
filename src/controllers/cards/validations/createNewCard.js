const { body } = require('express-validator/check');
const currentYear = Number(new Date().getFullYear().toString().substr(-2));

/**
 * Get Directions
 * @route POST /v1/directions
 *
 * @return {Response}
 */
module.exports = [
  body('number')
    .exists()
    .withMessage('number param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid number param: must not be empty.')
    .isCreditCard()
    .withMessage('Invalid number param: must be a valid card number.'),

  body('expirationMonth')
    .exists()
    .withMessage('expirationMonth param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid expirationMonth param: must not be empty.')
    .isInt({ min: 1, max: 12 })
    .withMessage('Invalid expirationMonth param: must be a valid month.'),

  // TODO: Reject exp for current year where month <= this
  body('expirationYear')
    .exists()
    .withMessage('expirationYear param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid expirationYear param: must not be empty.')
    .isInt({ min: currentYear, max: currentYear + 8 })
    .withMessage('Invalid expirationYear param: must be a valid year.'),

  body('cvc')
    .exists()
    .withMessage('cvc param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid cvc param: must not be empty.')
    .isLength({ min: 3, max: 4 })
    .withMessage('Invalid cvc param: must be a valid cvc.'),

  body('holderName')
    .exists()
    .withMessage('holderName param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid holderName param: must not be empty.')
    .custom((value, _) => typeof value === 'string')
    .withMessage('Invalid holderName param: must be string.'),
];
