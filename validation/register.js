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

  if (Validator.isEmpty(data.firstname)) errors.firstname = 'Firstname field is required';
  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) errors.firstname = 'Firstname must have 2-30 characters';

  if (Validator.isEmpty(data.lastname)) errors.lastname = 'Lastname field is required';
  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    console.log(!Validator.isLength(data.lastname, { min: 2, max: 30 }))
    console.log(data.lastname)
    errors.lastname = 'Lastname must have 2-30 characters';
  }

  if (Validator.isEmpty(data.email)) errors.email = 'Email field is required';
  if (!Validator.isEmail(data.email)) errors.email = 'Email is invalid';

  if (Validator.isEmpty(data.password)) errors.password = 'Password field is required';
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) errors.password = 'Password must have 6-30 characters';

  if (Validator.isEmpty(data.password2)) errors.password2 = 'Confirm Password field is required';
  if (!Validator.equals(data.password, data.password2)) errors.password2 = 'Passwords must match';

  if (Validator.isEmpty(data.birthday)) errors.birthday = 'Birthday field is required';

  if (Validator.isEmpty(data.sex)) errors.sex = 'Sex field is required';

  if (Validator.isEmpty(data.phone)) errors.phone = 'Phone field is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
