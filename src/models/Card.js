const cardTypes = [
  'debit',
  'credit',
];

module.exports = function (sequelize, DataTypes) {
  const card = sequelize.define('Card', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: cardTypes,
    },
    number: {
      type: DataTypes.STRING,
      field: 'number',
    },
    expirationMonth: {
      type: DataTypes.STRING,
      field: 'exp_month',
    },
    expirationYear: {
      type: DataTypes.STRING,
      field: 'exp_year',
    },
    cvc: {
      type: DataTypes.STRING,
      field: 'cvc',
    },
    holderName: {
      type: DataTypes.STRING,
      field: 'holder_name',
    },
  }, {
    tableName: 'cards',
    timestamps: false,
    underscored: true,
  });

  card.associate = (db) => {
    card.belongsTo(db.Customer, { as: 'customer', foreignKey: 'customer_id' });
  };

  return card;
};
