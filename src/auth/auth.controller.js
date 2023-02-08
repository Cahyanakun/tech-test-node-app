const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');
const ApiError = require('../common/helper/ApiError');
const authService = require('./auth.service');
const tokenService = require('../token/token.service');
const accountService = require('../account/account.service');

const register = catchAsync(async (req, res) => {
  const { email, password, phoneNumber, ...user } = req.body;
  const alreadyUser = await accountService.findByEmailOrPhoneNum(email, phoneNumber);
  if (alreadyUser)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email atau nomor handpone sudah terdaftar.');
  const account = await accountService.createWithUser({ email, password, phoneNumber }, user);
  const token = tokenService.buildLoginToken(account.id);
  apiResponse(res, 'User Created', { ...token, account }, httpStatus.CREATED);
});

const login = catchAsync(async (req, res) => {
  const { emailOrPhoneNum, password, isAdmin } = req.body;
  let account = await authService.login(emailOrPhoneNum, password, isAdmin);
  if (!account) throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  const token = tokenService.buildLoginToken(account.id, isAdmin);
  account = account.toJSON();
  apiResponse(res, 'Login Succeeded', { ...token, ...account });
});

module.exports = {
  register,
  login,
};
