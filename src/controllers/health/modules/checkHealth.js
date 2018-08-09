const {
  ApiError,
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const db = require(`${__app}/init/db`);

/**
 * Get authenticated customer
 * @route GET /v1/me
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  const services = {
    db: false,
  };

  return db
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      services.db = true;
      return sendApiResponse(res, services);
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
      services.db = false;

      return sendApiResponse(res, services);
    });
};
