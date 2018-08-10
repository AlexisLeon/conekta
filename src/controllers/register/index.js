module.exports = {
  validator: {
    register: require('./validations/register'),
  },

  // POST
  register: require('./modules/register'),
};
