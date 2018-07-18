const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.birthday = !isEmpty(data.birthday) ? data.birthday : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) errors.firstname = 'Imie musi miec 2-30 znaków';
  if (Validator.isEmpty(data.firstname)) errors.firstname = 'Imie nie może być puste';

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) errors.lastname = 'Nazwisko musi miec 2-30 znaków';
  if (Validator.isEmpty(data.lastname)) errors.lastname = 'Nazwisko nie może być puste';

  if (!Validator.isEmail(data.email)) errors.email = 'Podaj adres email';
  if (Validator.isEmpty(data.email)) errors.email = 'Email nie może być pusty';

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) errors.password = 'Hasło musi miec 6-30 znaków';
  if (Validator.isEmpty(data.password)) errors.password = 'Hasło nie może być puste';

  if (!Validator.equals(data.password, data.password2)) errors.password2 = 'Hasła muszą być identyczne';
  if (Validator.isEmpty(data.password2)) errors.password2 = 'Potwierdzenie hasła nie może być puste';

  if (Validator.isEmpty(data.birthday)) errors.birthday = 'Data urodzenia nie może być pusta';

  if (Validator.isEmpty(data.sex)) errors.sex = 'Płec nie może być pusta';

  if (Validator.isEmpty(data.phone)) errors.phone = 'Telefon nie może być pusty';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
