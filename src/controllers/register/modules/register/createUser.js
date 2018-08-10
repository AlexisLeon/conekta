const argon2 = require('argon2');
const { User } = require(`${__app}/init/db`);

module.exports = function (req, res) {
  return (data) => {
    const userData = {
      username: req.body.email,
      password: null,
      customer: res.locals.customer,
    };

    return argon2.hash(req.body.password)
      .then((hash) => {
        userData.password = hash;

        return User.create(userData)
          .then(() => Promise.resolve(data))
          .catch(err => Promise.reject(err));
      })
      .catch(err => Promise.reject(err));
  };
};
