const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.height = !isEmpty(data.height) ? data.height : '';
  data.weight = !isEmpty(data.weight) ? data.weight : '';
  data.meals = !isEmpty(data.meals) ? data.meals : '';
  data.selectedAim = !isEmpty(data.selectedAim) ? data.selectedAim : '';
  data.selectedAllergies = !isEmpty(data.selectedAllergies) ? data.selectedAllergies : '';
  data.selectedIllnesses = !isEmpty(data.selectedIllnesses) ? data.selectedIllnesses : '';
  data.selectedAfflictions = !isEmpty(data.selectedAfflictions) ? data.selectedAfflictions : '';

  if (Validator.isEmpty(data.height)) errors.height = 'Wzrost nie może być pusty';

  if (Validator.isEmpty(data.weight)) errors.weight = 'Waga nie może być pusta';

  if (Validator.isEmpty(data.meals)) errors.meals = 'Ilość posiłków nie może być pusta';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
