const {
  Request,
  Response,
} = require('oauth2-server');

const {
  errorTypes,
  sendApiError,
} = require(`${__app}/controllers/helpers/api`);

module.exports = (oauth) => (req, res, next) => {
  const request = new Request({
    headers: { authorization: req.headers.authorization },
    method: req.method,
    query: req.query,
    body: req.body,
  });

  const response = new Response(res);

  oauth.authenticate(request, response)
    .then((token) => {
      res.locals.user = token.user;
      res.locals.client = token.client;
      res.locals.decoded = token;

      next();
    })
    .catch(err => sendApiError(res, { // Not authorized.
      ...err,
      type: errorTypes.AUTHENTICATION_ERROR,
      status: err.code || 500,
    }));
};
