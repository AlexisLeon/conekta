const argon2 = require('argon2');
// const {
//   ApiError,
//   errorTypes,
// } = require(`${__app}/controllers/helpers/api`);
const db = require('../../init/db');
const { LOG } = require('./constants');

const {
  Customer,
  User,
} = db;

/**
 * getUser
 * @param username
 * @param password
 * @returns {Promise}
 */
module.exports = (username, password) => {
  if (LOG) console.log('getUser');

  const where = {};

  if (/^(\+?52)?\d{10}$/.test(username)) where.phone = username;
  else where.email = username;

  return User.findOne({
    attributes: ['id', 'username', 'password', 'customer'],
    include: {
      model: Customer,
      where,
      attributes: ['id'],
    },
  })
    .then((user) => {
      if (!user) {
        return false;
        // return new ApiError('User not found', {
        //   type: errorTypes.INVALID_REQUEST_ERROR,
        // });
      }

      return argon2.verify(user.password, password)
        .then((match) => {
          if (match) return user.toJSON();
          return false;

          // throw new ApiError('Wrong password', {
          //   type: errorTypes.INVALID_REQUEST_ERROR,
          // });
        })
        .catch(e => Promise.reject(e));
    })
    .catch((err) => {
      console.log('getUser - Err: ', err);
      return Promise.reject(err);
    });
};
