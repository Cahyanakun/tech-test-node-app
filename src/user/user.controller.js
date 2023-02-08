const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');
const userService = require('./user.service');
const accountService = require('../account/account.service');

const create = catchAsync(async (req, res) => {
  const { fullName, email, password, bod, address, phoneNumber } = req.body;
  const result = await accountService.createWithUser(
    { email, password, phoneNumber },
    { bod, address, fullName }
  );
  apiResponse(res, 'Success Created', result);
});

const list = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await userService.findAll({ ...query });
  apiResponse(res, 'Success get list User', result);
});

const show = catchAsync(async (req, res) => {
  apiResponse(res, 'Success get User', req.user);
});

const update = catchAsync(async (req, res) => {
  const { user, body } = req;
  const result = await accountService.updateWithUser(user, body);
  apiResponse(res, 'Success Updated', result);
});

const destroy = catchAsync(async (req, res) => {
  const { user } = req;
  await user.destroy();
  apiResponse(res, 'Success Deleted', user);
});

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
};
