exports.API_ERROR = 'api_error'; // Any other API error
exports.AUTHENTICATION_ERROR = 'authentication_error'; // Authentication failure.
exports.CARD_ERROR = 'card_error'; // Card errors
exports.ACCOUNT_ERROR = 'account_error'; // Account errors (e.g. insufficent funds, blocked, seized, ...).
exports.INVALID_REQUEST_ERROR = 'invalid_request_error'; // Request has invalid parameters.
exports.RATE_LIMIT_ERROR = 'rate_limit_error'; // Too many requests too quickly.
exports.VALIDATION_ERROR = 'validation_error'; // Fields validation failed

exports.failure = {
  ACCOUNT_CLOSED: 'account_closed',
  ACCOUNT_FROZEN: 'account_frozen',
  INSUFFICIENT_FUNDS: 'insufficient_funds',
  NO_ACCOUNT: 'no_account',
  UNSUPPORTED_CARD: 'unsupported_card',
};
