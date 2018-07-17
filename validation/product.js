const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddProduct(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.unit = !isEmpty(data.unit) ? data.unit : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) errors.name = 'Name must have 3-30 characters';
  if (Validator.isEmpty(data.name)) errors.name = 'Name is required';

  if (!Validator.isLength(data.unit, { min: 1, max: 30 })) errors.unit = 'Unit must have 3-30 characters';
  if (Validator.isEmpty(data.unit)) errors.unit = 'Unit is required';

  if (!Validator.isLength(data.category, { min: 3, max: 30 })) errors.category = 'Category must have 3-30 characters';
  if (Validator.isEmpty(data.category)) errors.category = 'Category is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
