const { SECRET_KEY, ALGORITHM } = require('../../Auth/config');

const name = 'jwt';

const schema = 'jwt';

const options = {
  key: SECRET_KEY,
  validate: () => (
    { isValid: true }
  ),
  verifyOptions: {
    algorithm: ALGORITHM
  }
}

module.exports = {
  name,
  schema,
  options,
}
