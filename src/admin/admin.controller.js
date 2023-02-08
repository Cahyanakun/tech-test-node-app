const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');
const adminService = require('./admin.service');
const accountService = require('../account/account.service');

const create = catchAsync(async (req, res) => {
  const { fullName, email, password, bod, address, phoneNumber } = req.body;
  const result = await accountService.createWithAdmin(
    { email, password, phoneNumber },
    { bod, address, fullName }
  );
  apiResponse(res, 'Success Created', result);
});

const list = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await adminService.findAll({ ...query });
  apiResponse(res, 'Success get list admin', result);
});

const show = catchAsync(async (req, res) => {
  apiResponse(res, 'Success get admin', req.admin);
});

const update = catchAsync(async (req, res) => {
  const { admin, body } = req;
  const result = await accountService.updateWithAdmin(admin, body);
  apiResponse(res, 'Success Updated', result);
});

const destroy = catchAsync(async (req, res) => {
  const { admin } = req;
  await admin.destroy();
  apiResponse(res, 'Success Deleted', admin);
});

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
};
