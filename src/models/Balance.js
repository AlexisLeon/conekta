module.exports = function (sequelize, DataTypes) {
  const accountBalance = sequelize.define('AccountBalance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    cleared: DataTypes.INTEGER,
    pending: DataTypes.INTEGER,
  }, {
    tableName: 'balance',
    timestamps: false,
    underscored: true,
  });

  accountBalance.associate = (db) => {
    accountBalance.belongsTo(db.Customer, { as: 'customer', foreignKey: 'customer_id' });
  };

  return accountBalance;
};
