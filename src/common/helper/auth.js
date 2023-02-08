const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const verifyToken = (token, cb) => {
  return jwt.verify(token, config.jwt.secret, cb);
};

module.exports = {
  verifyToken,
};
