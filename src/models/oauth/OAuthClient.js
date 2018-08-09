module.exports = function (sequelize, DataTypes) {
  return sequelize.define('OAuthClient', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING(255),
    client_id: DataTypes.STRING(80),
    client_secret: DataTypes.STRING(80),
    redirect_uri: DataTypes.STRING(2000),
    grant_types: DataTypes.STRING(80),
    scope: {
      type: DataTypes.STRING,
      default: 'read write trust',
    },
  }, {
    tableName: 'oauth_clients',
    timestamps: false,
    underscored: true,
  });
};
