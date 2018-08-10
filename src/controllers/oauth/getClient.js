// const {
//   ApiError,
//   errorTypes,
// } = require(`${__app}/controllers/helpers/api`);
// const { OAuthClient } = require('../../init/db');
const {
  DEFAULT_CLIENT_ID,
  DEFAULT_CLIENT_SECRET,
  DEFAULT_SCOPE,
  LOG,
} = require('./constants');

/**
 * getClient
 * @param clientId
 * @param clientSecret
 * @returns {grants<Array*>|redirectUris<Array*>}
 */
module.exports = (clientId, clientSecret) => {
  if (LOG) console.log('getClient');

  // NOTE: Add auth for multiple clients once we publish out the API
  if (clientId !== DEFAULT_CLIENT_ID || !clientSecret || clientSecret !== DEFAULT_CLIENT_SECRET) {
    return false;
    // return new ApiError('Invalid client credentials', {
    //   type: errorTypes.INVALID_REQUEST_ERROR,
    // });
  }

  // NOTE: Query client to enable 3rd party clients
  return {
    id: 1,
    name: 'Conekta Wallet',
    client_id: DEFAULT_CLIENT_ID,
    redirectUris: ['https://app.conektawallet.mx/login?redirect=/apps/home'],
    grants: ['password', 'refresh_token'], // 2-legged oauth
    scope: DEFAULT_SCOPE,
  };
};
