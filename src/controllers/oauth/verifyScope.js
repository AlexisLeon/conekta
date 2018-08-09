const { LOG } = require('./constants');

module.exports = (token, scope) => {
  if (LOG) console.log('verifyScope');

  return token.scope === scope ? scope : false;
};
