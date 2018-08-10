/* eslint-disable no-console */
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
process.title = 'Lab Conekta Wallet Service';
global.__base = __dirname;
global.__app = __dirname + '/src/';
process.env.TZ = 'America/Mexico_City';

const express = require('express');
const Raven = require('raven');
const OAuthServer = require('oauth2-server');
const conf = require('./src/config');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');

const middleware = require('./src/controllers/middleware');

const environment = process.env.NODE_ENV || conf.get('app:environment');
const isProduction = environment === 'production' || environment === 'stage';

const app = express();
Raven.config(
  `https://${conf.get('sentry:key')}:${conf.get('sentry:secret')}@sentry.io/${conf.get('sentry:project')}`,
  {
    shouldSendCallback: () => isProduction,
  },
).install();

// CONFIGURE APP
app.use(Raven.requestHandler());
app.use(morgan(conf.get('app:log')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(methodOverride());
app.use(helmet());
app.use(expressValidator());
app.use((req, res, next) => {
  const apiHost = conf.get('app:host');
  const apiPort = conf.get('app:port');
  const port = (apiPort === '80' ? '' : (`:${apiPort}`));

  if (!isProduction) {
    console.log('Request: ', req.body);
    console.log('Headers: ', req.headers);
  }

  res.header('Access-Control-Allow-Origin', apiHost + port);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

// CONFIGURE DATABASE
require('./src/init/db');

// HANDLE ERRORS
process.on('uncaughtException', (error) => {
  console.log(error.stack);
});

// OAuth
const oauth = new OAuthServer({
  model: require('./src/controllers/oauth'),
  grants: ['password', 'authorization_code'],
  debug: true,
  accessTokenLifetime: 30 * 60,
});

app.use('/', require('./src/routes/routes'));
app.use('/oauth', require('./src/routes/oauth')(oauth));
app.use('/v1', middleware.checkToken(oauth), require('./src/routes/api'));

// Generic errors
app.use('*', middleware.checkToken(oauth), (req, res) => res.status(403).json({
  error: {
    type: 'authentication_error',
    message: 'Forbidden',
  },
})); // 403 instead of 404

app.use(Raven.errorHandler());
app.use(middleware.logErrors);
app.use(middleware.errorHandler);

if (environment !== 'test') {
  app.listen(conf.get('app:port'), () => {
    console.log(`App started at port: ${conf.get('app:port')}`);
  });
}

module.exports = app;
