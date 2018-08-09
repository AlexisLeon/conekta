const conf = require('nconf');

conf.file(`${__app}/config/config.json`);

const environment = process.env.NODE_ENV || conf.get('app:environment');
const production = environment === 'production' || environment === 'stage';

// Load env variables
if (production) {
  conf.set('app:port', process.env.PORT);
  conf.set('app:environment', environment);

  conf.set('mysql:database', process.env.RDS_DB_NAME);
  conf.set('mysql:username', process.env.RDS_USERNAME);
  conf.set('mysql:password', process.env.RDS_PASSWORD);
  conf.set('mysql:host', process.env.RDS_HOSTNAME);
  conf.set('mysql:port', process.env.RDS_PORT);
}

if (environment === 'test' || environment === 'dev') {
  conf.set('app:port', process.env.PORT || 3000);
  conf.set('app:environment', environment);

  if (process.env.MYSQL_DATABASE) conf.set('mysql:database', process.env.MYSQL_DATABASE);
  if (process.env.MYSQL_USER) conf.set('mysql:username', process.env.MYSQL_USER);
  if (process.env.MYSQL_PASSWORD) conf.set('mysql:password', process.env.MYSQL_PASSWORD);
}

module.exports = conf;
