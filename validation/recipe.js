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

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) errors.name = 'Nazwa musi mieć 3-30 znaków';
  if (Validator.isEmpty(data.name)) errors.name = 'Nazwa nie może być pusta';

  if (Validator.isEmpty(data.calories)) errors.calories = 'Kalorie nie mogą być puste';

  if (Validator.isEmpty(data.protein)) errors.protein = 'Białko nie może być puste';

  if (Validator.isEmpty(data.fat)) errors.fat = 'Tłuszcz nie może być pusty';

  if (Validator.isEmpty(data.carbon)) errors.carbon = 'Węglowodany nie mogą być puste';

  if (Validator.isEmpty(data.execution)) errors.execution = 'Przepis nie może być pusty';

  if (!Validator.isLength(data.exclude, { max: 30 })) errors.exclude = 'Cechy wykluczające muszą mieć max 30 znaków';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
