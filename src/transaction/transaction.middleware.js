const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const ApiError = require('../common/helper/ApiError');
const transactionService = require('./transaction.service');

const getTransaction = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await transactionService.findOne({ where: { id } });
  if (!data) return next(new ApiError(httpStatus.NOT_FOUND, 'Data not found'));
  req.transaction = data;
  next();
});

module.exports = {
  getTransaction,
};
