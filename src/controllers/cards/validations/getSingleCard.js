const { param } = require('express-validator/check');

/**
 * Get single card
 * @route GET /v1/cards/:card_id
 * @param req.params.card_id {String} card_id
 *
 * @return {Response}
 */
module.exports = [
  param('card_id')
    .exists()
    .withMessage('Card id param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid card Id param: must not be empty.'),
];
