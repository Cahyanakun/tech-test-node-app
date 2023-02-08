const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const ApiError = require('../common/helper/ApiError');
const withdrawService = require('./withdraw.service');

const getWithdraws = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await withdrawService.findOne({ where: { id } });
  if (!data) return next(new ApiError(httpStatus.NOT_FOUND, 'Data not found'));
  req.withdraw = data;
  next();
});

module.exports = {
  getWithdraws,
};
