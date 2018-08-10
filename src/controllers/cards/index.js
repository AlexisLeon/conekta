module.exports = {
  validator: {
    createNewCard: require('./validations/createNewCard'),
  },

  getCards: require('./modules/getCards'),
  getSingleCard: require('./modules/getSingleCard'),

  createNewCard: require('./modules/createNewCard'),
};
