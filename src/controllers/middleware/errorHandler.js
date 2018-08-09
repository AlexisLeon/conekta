const {
  ApiError,
  errorTypes,
  sendApiError,
} = require(`${__app}/controllers/helpers/api`);
const { isCelebrate } = require('celebrate');

module.exports = (err, req, res, next) => {
  // Handle express, node libs, etc. errors
  if (err instanceof SyntaxError && err.status === 400) {
    return sendApiError(res, new ApiError('Invalid JSON received', {
      ...err,
      type: errorTypes.INVALID_REQUEST_ERROR,
    }));
  }

  if (isCelebrate(err)) {
    const details = err.details[0];

    return sendApiError(res, new ApiError(details.message, {
      // ...details,
      message: details.message,
      type: errorTypes.INVALID_REQUEST_ERROR,
    }));
  }

  return sendApiError(res, err);
};
