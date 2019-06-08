if (process.env.NODE_ENV === 'production') {
  const keys = require('./keys_prod');
  console.log(keys);
  module.exports = keys;
} else {
  module.exports = require('./keys_dev');
}