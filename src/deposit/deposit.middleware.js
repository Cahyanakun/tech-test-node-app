const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const ApiError = require('../common/helper/ApiError');
const depositService = require('./deposit.service');

const getDeposit = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await depositService.findOne({ where: { id } });
  if (!data) return next(new ApiError(httpStatus.NOT_FOUND, 'Data not found'));
  req.deposit = data;
  next();
});

module.exports = {
  getDeposit,
};
