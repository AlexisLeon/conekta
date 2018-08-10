const {
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const { Card } = require(`${__app}/init/db`);

/**
 * Get cards
 * @route GET /v1/cards
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  return Card
    .findAll({
      where: { customer_id: res.locals.user.customer },
      attributes: [
        'id',
        'type',
        'number',
        'expirationMonth',
        'expirationYear',
        'holderName',
      ],
    })
    .then(data => data.map((e) => {
      const { number, ...card } = e.toJSON();
      card.number = number.slice(-4);
      return card;
    }))
    .then(data => sendApiResponse(res, data))
    .catch(err => sendApiError(res, err));
};
