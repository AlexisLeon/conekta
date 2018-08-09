const {
  ApiError,
  errorTypes,
} = require(`${__app}/controllers/helpers/api`);
const db = require('../../init/db');
const {
  DEFAULT_CLIENT_ID,
  DEFAULT_SCOPE,
  LOG,
} = require('./constants');

const {
  User,
  OAuthAccessToken,
} = db;

const client = {
  id: 1,
  client_id: DEFAULT_CLIENT_ID,
  scope: DEFAULT_SCOPE,
};

/*
 * getAccessToken
 *
 * @param accessToken
 *
 * @return token
 * @return token.accessToken
 * @return token.accessTokenExpiresAt
 * @return token.user
 * @return token.client
 * @return token.scope
 *
 */
module.exports = (accessToken) => {
  if (LOG) console.log('getAccessToken');

  // Validate
  if (!accessToken || accessToken === 'undefined') {
    return false;
    // return new ApiError('Invalid access token', {
    //   type: errorTypes.INVALID_REQUEST_ERROR,
    // });
  }

  return OAuthAccessToken
    .findOne({
      where: { access_token: accessToken },
      attributes: [['access_token', 'accessToken'], ['expires', 'accessTokenExpiresAt'], 'scope'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'customer'],
        },
        // OAuthClient,
      ],
    })
    .then((queriedToken) => {
      if (!queriedToken) {
        return false;
        // return new ApiError('Invalid access token', {
        //   type: errorTypes.INVALID_REQUEST_ERROR,
        // });
      }

      const token = queriedToken.toJSON();

      return {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        user: token.User,
        client, // token.OAuthClient,
        scope: token.scope,
      };
    })
    .catch((err) => {
      console.log('getAccessToken - Err: ', err);
      return Promise.reject(err);
    });
};
