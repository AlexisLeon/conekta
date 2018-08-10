const {
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const { Card } = require(`${__app}/init/db`);

/**
 * Create new card
 * @route POST /v1/cards
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  const cardData = {
    type: 'debit',
    number: req.body.number,
    expirationMonth: req.body.expirationMonth,
    expirationYear: req.body.expirationYear,
    cvc: req.body.cvc,
    holderName: req.body.holderName,
    customer_id: res.locals.user.customer,
  };

  return Card.create(cardData)
    .then((newCard) => {
      const card = {
        id: newCard.id,
        type: newCard.type,
        expirationMonth: newCard.expirationMonth,
        expirationYear: newCard.expirationYear,
        holderName: newCard.holderName,
        number: newCard.number.slice(-4),
      };

      return card;
    })
    .then(data => sendApiResponse(res, data))
    .catch(err => sendApiError(res, err));
};
