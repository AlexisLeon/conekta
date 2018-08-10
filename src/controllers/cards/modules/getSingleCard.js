const {
  ApiError,
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const { Card } = require(`${__app}/init/db`);

/**
 * Get single card
 * @route GET /v1/cards/:card_id
 * @param req.params.card_id {String} card_id
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  return Card
    .findOne({
      where: {
        customer_id: res.locals.user.customer,
        id: req.params.card_id,
      },
      attributes: [
        'id',
        'type',
        'number',
        'expirationMonth',
        'expirationYear',
        'holderName',
      ],
    })
    .then((result) => {
      if (!result) {
        throw new ApiError(
          `There is no card with ID ${req.params.card_id}.`,
          { type: errorTypes.INVALID_REQUEST_ERROR },
        );
      }

      const { number, ...card } = result.toJSON();
      return {
        ...card,
        number: number.slice(-4),
      };
    })
    .then(card => sendApiResponse(res, card))
    .catch(err => sendApiError(res, err));
};
