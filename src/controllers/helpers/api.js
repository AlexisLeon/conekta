const errorTypes = require('../../config/errorTypes');

/**
 * Send Api Response
 *
 * @param res
 * @param body
 * @returns {Response}
 */
function sendApiResponse(res, body) {
  if (res.headersSent) return;
  const status = 200;
  res.setHeader('Content-Type', 'application/json');
  console.log(body);
  return res.status(status).send(JSON.stringify(body)); // null, 3
}

/**
 * throw Api Error
 *
 * @param res
 * @param {ApiError} error
 * @param error.status
 * @param error.type
 * @param error.message
 * @param error.transaction
 * @param error.code
 * @param error.decline_code
 * @param error.failure_code
 * @param error.param
 * @returns {Response}
 */
function sendApiError(res, {
  status, // HTTP status
  type,
  message,
  transaction,
  code,
  decline_code,
  failure_code,
  param,
  // ...rest
}) {
  if (res.headersSent) return; // if some intern does something wrong

  switch (type) {
    case errorTypes.API_CONNECTION_ERROR:
      break;

    case errorTypes.API_ERROR:
      status = status || 500;
      message = message || 'Server error: Something went wrong.';
      break;

    case errorTypes.AUTHENTICATION_ERROR:
      status = status || 401;
      break;

    case errorTypes.CARD_ERROR:
      break;

    case errorTypes.ACCOUNT_ERROR:
      status = status || 400;
      break;

    case errorTypes.INVALID_REQUEST_ERROR:
      status = status || 400;
      break;

    case errorTypes.RATE_LIMIT_ERROR:
      status = status || 429;
      break;

    case errorTypes.VALIDATION_ERROR:
      status = status || 400;
      break;

    default:
      // If an error comes here, means that we're not handling all errors properly.
      // so we must notify dev team -> sentry/track.js
      status = status || 500;
      type = errorTypes.API_ERROR; // internal_server_error
      message = message || 'Server error: Something went wrong.';
      break;
  }

  const error = JSON.stringify({ // remove undefined
    error: {
      type,
      message,
      transaction,
      code,
      decline_code,
      failure_code,
      param,
    },
  });

  console.log(error);

  res.setHeader('Content-Type', 'application/json');
  return res.status(status).send(error);
}

/**
 * ApiError
 *
 * @param message
 * @param args.status
 * @param args.type
 * @param args.message
 * @param args.transaction
 * @param args.code
 * @param args.decline_code
 * @param args.param
 */
class ApiError extends Error {
  constructor(message, args) {
    super();

    Error.captureStackTrace(this, ApiError);

    this.message = message;
    if (args.status != null) this.status = args.status;
    if (args.type != null) this.type = args.type;
    if (args.message != null) this.message = args.message;
    if (args.transaction != null) this.transaction = args.transaction;
    if (args.code != null) this.code = args.code;
    if (args.decline_code != null) this.decline_code = args.decline_code;
    if (args.failure_code != null) this.failure_code = args.failure_code;
    if (args.param != null) this.param = args.param;
  }
}

module.exports = {
  errorTypes,
  sendApiResponse,
  sendApiError,
  ApiError,
};
