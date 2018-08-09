module.exports = (err, req, res, next) => {
  // TODO: Log errors to errors.log

  console.error(`${err.name}: ${err.message || ''}`, JSON.stringify(err, 0, 2));

  next(err);
};
