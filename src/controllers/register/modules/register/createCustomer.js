const { ApiError, errorTypes } = require(`${__app}/controllers/helpers/api`);
const { Customer } = require(`${__app}/init/db`);

module.exports = function (req, res) {
  return function () {
    const customerData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    return Customer.findOne({
      where: { email: customerData.email },
    })
      .then((result) => {
        if (result) {
          return Promise.reject(new ApiError('User already exists', {
            type: errorTypes.INVALID_REQUEST_ERROR,
          }));
        }

        return Customer.create(customerData)
          .then((newCustomer) => {
            const {
              id: customerId,
              ...customer
            } = newCustomer.toJSON();
            res.locals.customer = customerId;

            return Promise.resolve(customer);
          })
          .catch(err => Promise.reject(err));
      });
  };
};
