module.exports = function (sequelize, DataTypes) {
  return sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    refresh_token: DataTypes.STRING(256),
    expires: DataTypes.DATE,
    scope: DataTypes.STRING,
    revoked: DataTypes.BOOLEAN,
  }, {
    tableName: 'oauth_refresh_tokens',
    timestamps: false,
    underscored: true,
  });
};
