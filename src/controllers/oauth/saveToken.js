const db = require('../../init/db');

const {
  OAuthAccessToken,
  OAuthRefreshToken,
} = db;

const {
  DEFAULT_SCOPE,
  LOG,
} = require('./constants');

module.exports = (token, client, user) => {
  if (LOG) console.log('saveToken');

  // NOTE: While using .attributes: [['expires', 'expiresAt']] the
  // date from SQL 2017-11-08 22:04:22 is parsed as 2017-11-08T22:04:17.000Z
  return OAuthAccessToken
    .findOne({
      where: { user_id: user.id },
      attributes: [['access_token', 'accessToken'], ['expires', 'expiresAt'], 'scope'],
      include: [
        {
          model: OAuthRefreshToken,
          attributes: [['refresh_token', 'refreshToken'], ['expires', 'expiresAt'], 'revoked'],
        },
      ],
    })
    .then((queriedToken) => {
      if (queriedToken !== null) {
        console.log('\n\n----> HAS STORED TOKEN\n\n');

        // For grant_type: refresh_token action
        if (queriedToken.RefreshToken.revoked) {
          console.log('\n\n----> HAS REVOKEN TOKEN\n\n');

          return Promise.all([
            OAuthAccessToken.update({
              access_token: token.accessToken,
              expires: token.accessTokenExpiresAt,
            }, { where: { user_id: user.id } }),
            OAuthRefreshToken.update({
              refresh_token: token.refreshToken,
              expires: token.refreshTokenExpiresAt,
              revoked: false,
            }, { where: { user_id: user.id } }),
          ])
            .then(() => ({
              client,
              user,
              accessToken: token.accessToken,
              refreshToken: token.refreshToken,
              ...token,
            }))
            .catch((err) => {
              console.log('\n\n\nERROR ON REFRESH TOKEN: ', err);
              return Promise.reject(err);
            });
        }


        const tok = queriedToken.toJSON(); // used only for non-expired tokens

        // Check if current token still valid and return it
        const expires = new Date(tok.expiresAt).getTime();
        const now = Date.now();

        if (expires > now) {
          console.log('\n\n----> HAS VALID TOKEN\n\n');

          return {
            accessToken: tok.accessToken,
            accessTokenExpiresAt: tok.expiresAt,
            refreshToken: tok.RefreshToken.refreshToken,
            refreshTokenExpiresAt: tok.RefreshToken.expiresAt,
            scope: DEFAULT_SCOPE,
            client,
            user,
          };
        } else { // Current token has expired
          console.log('\n\n----> HAS EXPIRED TOKEN\n\n', token);

          return Promise.all([
            OAuthAccessToken.update({
              access_token: token.accessToken,
              expires: token.accessTokenExpiresAt,
            }, { where: { user_id: user.id } }),
            OAuthRefreshToken.update({
              refresh_token: token.refreshToken,
              expires: token.refreshTokenExpiresAt,
            }, { where: { user_id: user.id } }),
          ])
            .then(() => ({
              client,
              user,
              accessToken: token.accessToken,
              refreshToken: token.refreshToken,
              ...token,
            }))
            .catch(err => Promise.reject(err));
        }
      } else {
        console.log('\n\n----> NO STORED TOKEN\n\n');

        // has no stored token (first token request)
        return OAuthAccessToken.create({
          access_token: token.accessToken,
          expires: token.accessTokenExpiresAt,
          client_id: client.id,
          user_id: user.id,
          scope: token.scope,
        })
          .then(accessToken => OAuthRefreshToken.create({
            access_token_id: accessToken.id, // set access token ref
            refresh_token: token.refreshToken,
            expires: token.refreshTokenExpiresAt,
            client_id: client.id,
            user_id: user.id,
            scope: token.scope,
          }))
          .then(() => ({
            client,
            user,
            accessToken: token.accessToken, // proxy
            refreshToken: token.refreshToken, // proxy
            ...token,
          }))
          .catch(err => Promise.reject(err));
      }
    });
};
