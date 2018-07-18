const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) errors.email = 'Nieprawidłowy adres email';

  if (Validator.isEmpty(data.email)) errors.email = 'Email nie może być pusty';

  if (Validator.isEmpty(data.password)) errors.password = 'Hasło nie może być puste';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
