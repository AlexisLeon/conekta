const express = require('express');
const OAuthServer = require('oauth2-server');

const {
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require('../controllers/helpers/api');
const { validator } = require('../controllers/oauth');

const router = express.Router();
const { Request, Response } = OAuthServer;

module.exports = (oauth) => {
  router.post('/token', validator.oauth, (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    oauth
      .token(request, response)
      .then((token) => {
        const expires = new Date(token.accessTokenExpiresAt);
        const now = new Date();
        const expiresIn = parseInt((expires.getTime() - now.getTime()) / 1000, 10);

        return sendApiResponse(res, {
          access_token: token.accessToken,
          token_type: 'Bearer',
          refresh_token: token.refreshToken,
          expires_in: expiresIn,
          scope: token.scope, // TODO: Add scopes
        });
      })
      .catch((err) => {
        const { message, code } = err;

        console.log(err);
        // TODO: If auth-api error report to sentry
        return sendApiError(res, {
          type: errorTypes.INVALID_REQUEST_ERROR,
          status: code === 400 ? 403 : code,
          message,
        });
      });
  });

  return router;
};
