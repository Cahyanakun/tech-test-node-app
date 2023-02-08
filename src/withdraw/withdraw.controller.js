const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');
const withdrawService = require('./withdraw.service');
const ApiError = require('../common/helper/ApiError');

const create = catchAsync(async (req, res) => {
  const { body, account } = req;
  const result = await withdrawService.create({ ...body, userId: account.user.id });
  apiResponse(res, 'Success Created', result);
});

const list = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await withdrawService.findAll({ ...query });
  apiResponse(res, 'Success get list', result);
});

const approvalStatus = catchAsync(async (req, res) => {
  const { withdraw } = req;
  try {
    const result = await withdraw.update({ status: 1 });
    apiResponse(res, 'Withdraw Successfully Updated', result);
  } catch (err) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, err.message);
  }
});

module.exports = {
  create,
  list,
  approvalStatus,
};
