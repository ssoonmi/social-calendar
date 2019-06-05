const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validCalendarInput(data) {
  const { name, description } = data;
  let errors = {};

  data.name = validText(name) ? name : '';
  data.description = validText(description) ? description : '';

  if (!Validator.isLength(data.name, { max: 50 })) {
    errors.name = 'Name must be under 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (!Validator.isLength(data.description, { max: 150 })) {
    errors.descriptions = 'Description must be under 150 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}