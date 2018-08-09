module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: DataTypes.STRING(64),
    password: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  user.associate = (db) => {
    user.belongsTo(db.Customer, { foreignKey: 'customer' });
  };

  return user;
};
