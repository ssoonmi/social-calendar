const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  const { username, email, password, password2 } = data;
  let errors = {};
  data.email = validText(email) ? email : "";
  data.username = validText(username) ? username : "";
  data.password = validText(password) ? password : "";
  data.password2 = validText(password2) ? password2 : "";

  const isEmail = Validator.isEmail(data.email);
  const isEmailEmpty = Validator.isEmpty(data.email);
  const isUsernameEmpty = Validator.isEmpty(data.username);
  const isPasswordEmpty = Validator.isEmpty(data.password);
  const isPassword2Empty = Validator.isEmpty(data.password2);

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters';
  }

  if (isEmailEmpty) {
    errors.email = 'Email is required';
  }

  if (isUsernameEmpty) {
    errors.username = 'Username is required';
  }

  if (!isEmail) {
    errors.email = 'Email must be in email format';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (isPasswordEmpty) {
    errors.password = 'Password is required'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  if (isPassword2Empty) {
    errors.password2 = 'Confirm Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}