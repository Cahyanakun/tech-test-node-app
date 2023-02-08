const jwt = require('jsonwebtoken');
const security = require('../common/helper/security');
const config = require('../config/config');
const tokenTypes = require('../common/enum/tokens');
const { verifyToken } = require('../common/helper/auth');

const takePayload = (token) => {
  return verifyToken(token, (err, payload) => {
    if (err) return null;
    return payload;
  });
};

const _signToken = (payload, expiresIn = config.jwt.accessExpiration) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn });
};

const generateAccessToken = (payload) => {
  return _signToken({ ...payload, type: tokenTypes.ACCESS }, config.jwt.accessExpiration);
};

const generateRefreshToken = (payload) => {
  return _signToken({ ...payload, type: tokenTypes.REFRESH }, config.jwt.refreshExpiration);
};

const generatePairToken = (payload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

const generateResetPasswordToken = (email) => {
  return _signToken({ email, type: tokenTypes.RESET_PASSWORD }, 3600 * 24);
};

const refreshAccessToken = (refreshToken) => {
  return verifyToken(refreshToken, (err, payload) => {
    if (err || payload.type !== tokenTypes.REFRESH) return null;
    delete payload.iat;
    delete payload.exp;
    return { ...generatePairToken(payload) };
  });
};

const buildLoginToken = (accountId, isAdmin = false) => {
  const payload = { accountId, isAdmin };
  return generatePairToken(payload);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generatePairToken,
  refreshAccessToken,
  buildLoginToken,
  takePayload,
  generateResetPasswordToken,
};
