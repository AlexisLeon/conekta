module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: DataTypes.STRING(64),
    firstName: {
      type: DataTypes.STRING(64),
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(64),
      field: 'last_name',
    },
  }, {
    tableName: 'customers',
    underscored: true,
  });
};
