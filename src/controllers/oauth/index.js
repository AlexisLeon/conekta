module.exports = {
  validator: {
    oauth: require('./validations/oauth'),
  },

  generateAccessToken: require('./generateAccessToken'), //  optional - used for jwt
  generateRefreshToken: require('./generateRefreshToken'), //  - optional
  getAccessToken: require('./getAccessToken'),
  getClient: require('./getClient'),
  getRefreshToken: require('./getRefreshToken'),
  getUser: require('./getUser'),
  revokeToken: require('./revokeToken'),
  saveToken: require('./saveToken'),
  validateScope: require('./validateScope'),
  verifyScope: require('./verifyScope'),
};
