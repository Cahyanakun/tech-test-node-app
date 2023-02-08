const httpStatus = require('http-status');
const ApiError = require('../common/helper/ApiError');
const apiResponse = require('../common/helper/apiResponse');
const catchAsync = require('../common/helper/catchAsync');
const carService = require('../car/car.service');
const leasingService = require('../leasing/leasing.service');

const listCars = catchAsync(async (req, res) => {
  const result = await carService.findAllWithoutPaginate({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  apiResponse(res, 'Success', result);
});

const listLeasings = catchAsync(async (req, res) => {
  const result = await leasingService.findAllWithoutPaginate({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  apiResponse(res, 'Success', result);
});

module.exports = {
  listLeasings,
  listCars,
};
