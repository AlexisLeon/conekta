const {
  ApiError,
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const { Customer } = require(`${__app}/init/db`);

/**
 * Get authenticated customer
 * @route GET /v1/me
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  return Customer
    .findOne({
      where: { id: res.locals.user.customer },
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
      ],
    })
    .then((user) => {
      if (!user) throw new ApiError('User nor found', { type: errorTypes.INVALID_REQUEST_ERROR });

      return sendApiResponse(res, user.toJSON());
    })
    .catch(err => sendApiError(res, err));
};
