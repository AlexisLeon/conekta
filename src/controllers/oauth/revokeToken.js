const db = require('../../init/db');
const { LOG } = require('./constants');

const {
  OAuthRefreshToken,
} = db;

module.exports = (token) => {
  if (LOG) console.log('revokeToken');

  return OAuthRefreshToken.findOne({
    where: { refresh_token: token.refreshToken },
  })
    .then((queriedToken) => {
      if (!queriedToken) return false;

      return queriedToken.update({ revoked: true });
    })
    .catch((err) => {
      console.log('revokeToken - Err: ', err);
      return Promise.reject(err);
    });
};
