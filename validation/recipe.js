const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddRecipe(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.calories = !isEmpty(data.calories) ? data.calories : '';
  data.protein = !isEmpty(data.protein) ? data.protein : '';
  data.fat = !isEmpty(data.fat) ? data.fat : '';
  data.carbon = !isEmpty(data.carbon) ? data.carbon : '';
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : '';
  data.execution = !isEmpty(data.execution) ? data.execution : '';
  data.exclude = !isEmpty(data.exclude) ? data.exclude : '';

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) errors.name = 'Name must have 3-30 characters';
  if (Validator.isEmpty(data.name)) errors.name = 'Name is required';

  if (!Validator.isLength(data.calories, { min: 3, max: 30 })) errors.calories = 'Calories must have 3-30 characters';
  if (Validator.isEmpty(data.calories)) errors.calories = 'Calories is required';

  if (!Validator.isLength(data.protein, { min: 3, max: 30 })) errors.protein = 'Protein must have 3-30 characters';
  if (Validator.isEmpty(data.protein)) errors.protein = 'Protein is required';

  if (!Validator.isLength(data.fat, { min: 3, max: 30 })) errors.fat = 'Fat must have 3-30 characters';
  if (Validator.isEmpty(data.fat)) errors.fat = 'Fat is required';

  if (!Validator.isLength(data.carbon, { min: 3, max: 30 })) errors.carbon = 'Carbon must have 3-30 characters';
  if (Validator.isEmpty(data.carbon)) errors.carbon = 'Carbon is required';

  if (!Validator.isLength(data.execution, { min: 3, max: 30 })) errors.execution = 'Execution must have 3-30 characters';
  if (Validator.isEmpty(data.execution)) errors.execution = 'Execution is required';

  if (!Validator.isLength(data.exclude, { min: 3, max: 30 })) errors.exclude = 'Exclude must have 3-30 characters';
  if (Validator.isEmpty(data.exclude)) errors.exclude = 'Exclude is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
