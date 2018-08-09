module.exports = function (sequelize, DataTypes) {
  return sequelize.define('OAuthAuthorizationCode', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    authorization_code: DataTypes.STRING(256),
    expires: DataTypes.DATE,
    redirect_uri: DataTypes.STRING(2000),
    scope: DataTypes.STRING,
  }, {
    tableName: 'oauth_authorization_codes',
    timestamps: false,
    underscored: true,
  });
};

// No 3rd party apps... yet
// db.OAuthAuthorizationCode.belongsTo(db.OAuthClient, { foreignKey: 'client_id' });
// db.OAuthAuthorizationCode.belongsTo(db.User, { foreignKey: 'user_id' });
