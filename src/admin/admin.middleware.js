const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const ApiError = require('../common/helper/ApiError');
const adminService = require('./admin.service');

const getAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await adminService.findOne({ where: { id }, include: 'account' });
  if (!data) return next(new ApiError(httpStatus.NOT_FOUND, 'Data not found'));
  req.admin = data;
  next();
});

module.exports = {
  getAdmin,
};
