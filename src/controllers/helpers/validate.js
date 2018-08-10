const { celebrate, errors, Joi, isCelebrate } = require('celebrate');
const language = require('../../config/validate/language');

module.exports = {
  validate: (schema, options) => celebrate(schema, { language, escapeHtml: true, ...options }),
  celebrate,
  errors,
  Joi,
  isCelebrate,

  // custom validators
};
