const statusTypes = [
  'PENDING',
  'SETTLED',
];

const transactionTypes = [
  'TOP_UP',
  'TOP_UP_REVERSAL',
  'TRANSFER',
  'TRANSFER_CANCEL',
  'TRANSFER_FAILURE',
  'TRANSFER_REFUND',
  'WITHDRAW',
  'WITHDRAW_CANCEL',
  'WITHDRAW_FAILURE',
];

module.exports = function (sequelize, DataTypes) {
  const transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    amount: DataTypes.INTEGER,
    currency: DataTypes.STRING(3),
    total: DataTypes.INTEGER,
    description: DataTypes.STRING,
    source: DataTypes.STRING, // Must be ID
    status: {
      type: DataTypes.ENUM,
      values: statusTypes,
    },
    type: {
      type: DataTypes.ENUM,
      values: transactionTypes,
    },
    created: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'transactions',
    underscored: true,

    updatedAt: 'updated',
    createdAt: 'created',
  });

  transaction.associate = (db) => {
    transaction.belongsTo(db.Customer, { as: 'customer', foreignKey: 'customer_id' });
  };

  return transaction;
};
