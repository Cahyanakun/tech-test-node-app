const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const ApiError = require('../common/helper/ApiError');
const userService = require('./user.service');

const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await userService.findOne({ where: { id }, include: 'account' });
  if (!data) return next(new ApiError(httpStatus.NOT_FOUND, 'Data not found'));
  req.user = data;
  next();
});

module.exports = {
  getUser,
};
