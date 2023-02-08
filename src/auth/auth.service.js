const httpStatus = require('http-status');
const accountService = require('../account/account.service');
const security = require('../common/helper/security');
const ApiError = require('../common/helper/ApiError');

const login = async (email, password, isAdmin) => {
  const account = await accountService.findByEmailWithProfile(email, isAdmin);
  if (account) {
    const passwordValid = account && security.compareHash(password, account.password);
    if (!account || !passwordValid) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to login');
  }
  return account;
};

module.exports = {
  login,
};
