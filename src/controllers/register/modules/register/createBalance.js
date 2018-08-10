const { Balance } = require(`${__app}/init/db`);

module.exports = function (req, res) {
  return (data) => {
    const balanceData = {
      cleared: 0,
      pending: 0,
      customer: res.locals.customer,
    };

    return Balance.create(balanceData)
      .then(() => Promise.resolve(data))
      .catch(err => Promise.reject(err));
  };
};
