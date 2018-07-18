const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddProduct(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.unit = !isEmpty(data.unit) ? data.unit : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) errors.name = 'Nazwa musi mieć 3-30 znaków';
  if (Validator.isEmpty(data.name)) errors.name = 'Nazwa nie może być pusta';

  if (!Validator.isLength(data.unit, { min: 1, max: 30 })) errors.unit = 'Jednostka musi mieć 3-30 znaków';
  if (Validator.isEmpty(data.unit)) errors.unit = 'Jednostka nie może być pusta';

  if (!Validator.isLength(data.category, { min: 3, max: 30 })) errors.category = 'Kategoria musi mieć 3-30 znaków';
  if (Validator.isEmpty(data.category)) errors.category = 'Kategoria nie może być pusta';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
