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
  OAuthRefreshToken,
  User,
} = db;

const client = {
  id: 1,
  client_id: DEFAULT_CLIENT_ID,
  scope: DEFAULT_SCOPE,
};

/**
 * getRefreshToken
 *
 * @param refreshToken
 *
 * @return token
 * @return token.refreshToken
 * @return token.refreshTokenExpiresAt
 * @return token.scope
 * @return token.client
 * @return token.user
 */
module.exports = (refreshToken) => {
  if (LOG) console.log('getRefreshToken');

  // Validate
  if (!refreshToken || refreshToken === 'undefined') {
    return new ApiError('Invalid param refresh token', {
      type: errorTypes.INVALID_REQUEST_ERROR,
    });
  }

  return OAuthRefreshToken
    .findOne({
      attributes: [['refresh_token', 'refreshToken'], ['expires', 'refreshTokenExpiresAt'], 'scope'],
      where: { refresh_token: refreshToken },
      include: [
        // {
        //   model: OAuthClient,
        //   attributes: ['id'],
        // },
        User,
      ],
    })
    .then((queriedToken) => {
      if (!queriedToken) {
        return false;
        // return new ApiError('Invalid param refresh token', {
        //   type: errorTypes.INVALID_REQUEST_ERROR,
        // });
      }

      const token = queriedToken.toJSON();

      return {
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: token.scope,
        client, // token.OAuthClient,
        user: token.User,
      };
    }).catch((err) => {
      console.log('getRefreshToken - Err: ', err);
      return Promise.reject(err);
    });
};
