const { VALID_SCOPES, LOG } = require('./constants');

/**
 * validateScope
 * @param user
 * @param client
 * @param scope
 * @returns {string}
 */
module.exports = (user, client, scope) => {
  if (LOG) console.log('validateScope');

  // TODO: Query scopes to enable 3rd party clients request customer access
  // TODO: Should verify client.token with scope and return a Boolean
  return client.scope
    .split(' ')
    .filter(s => VALID_SCOPES.indexOf(s) >= 0)
    .join(' ');
};
