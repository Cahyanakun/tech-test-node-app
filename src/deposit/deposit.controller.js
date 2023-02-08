const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');
const depositService = require('./deposit.service');
const ApiError = require('../common/helper/ApiError');

const create = catchAsync(async (req, res) => {
  const { body, account } = req;
  const result = await depositService.create({ ...body, userId: account.user.id });
  apiResponse(res, 'Success Created', result);
});

const list = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await depositService.findAll({ ...query });
  apiResponse(res, 'Success get list', result);
});

const approvalStatus = catchAsync(async (req, res) => {
  const { deposit } = req;
  try {
    const result = await deposit.update({ status: 1 });
    apiResponse(res, 'Deposit Successfully Updated', result);
  } catch (err) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, err.message);
  }
});

module.exports = {
  create,
  list,
  approvalStatus,
};
