const Sequelize = require('sequelize');
const conf = require('../config');

const db = new Sequelize(
  conf.get('mysql:database'),
  conf.get('mysql:username'),
  conf.get('mysql:password'),
  {
    host: conf.get('mysql:host'),
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: conf.get('mysql:logging'),
    operatorsAliases: false,
    underscored: true,
  },
);


// App Models
db.Customer = db.import('../models/Customer');
db.Balance = db.import('../models/Balance');
// db.Card = db.import('../models/Card');
// db.Transaction = db.import('../models/Transaction');

// Oauth Models
db.OAuthAccessToken = db.import('../models/oauth/OAuthAccessToken');
db.OAuthRefreshToken = db.import('../models/oauth/OAuthRefreshToken');
// db.OAuthClient = db.import('../models/oauth/OAuthClient');
db.OAuthScope = db.import('../models/oauth/OAuthScope');
db.User = db.import('../models/oauth/User');


// Associations
db.OAuthAccessToken.belongsTo(db.User, { foreignKey: 'user_id' });
db.OAuthAccessToken.hasOne(db.OAuthRefreshToken, { foreignKey: 'access_token_id' });
db.OAuthRefreshToken.belongsTo(db.User, { foreignKey: 'user_id' });

// Associate
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
exports.Sequelize = Sequelize;
