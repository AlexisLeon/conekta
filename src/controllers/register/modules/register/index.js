const {
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const createCustomer = require('./createCustomer.js');
const createBalance = require('./createBalance.js');
const createUser = require('./createUser.js');

/**
 * Register - Create a customer
 * @route POST /register
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  return Promise.resolve()
    .then(createCustomer(req, res))
    .then(createBalance(req, res))
    .then(createUser(req, res))
    .then(response => sendApiResponse(res, response))
    .catch(err => sendApiError(res, err));
};
