const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  const { email, password } = data;
  let errors = {};
  data.email = validText(email) ? email : "";
  data.password = validText(password) ? password : "";

  const isEmailEmpty = Validator.isEmpty(data.email);
  const isPasswordEmpty = Validator.isEmpty(data.password);

  if (isEmailEmpty) {
    errors.email = 'Email or Username is required';
  }

  if (isPasswordEmpty) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}