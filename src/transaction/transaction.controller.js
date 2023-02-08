const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');
const transactionService = require('./transaction.service');
const transactionPaymentService = require('../transaction-payment/transaction-payment.service');
const transferPaymentService = require('../transfer/transfer.service');
const ApiError = require('../common/helper/ApiError');

const create = catchAsync(async (req, res) => {
  const { body, account } = req;
  const result = await transactionService.create({ ...body, userId: account.user.id });
  apiResponse(res, 'Success Created', result);
});

const listCredit = catchAsync(async (req, res) => {
  const { query, account } = req;
  const result = await transactionService.findAllByUser(query, account.user.id);
  apiResponse(res, 'Success get list', result);
});

const listInvoice = catchAsync(async (req, res) => {
  const { query, account } = req;
  const result = await transactionPaymentService.findAllByUser(query, account.user.id);
  apiResponse(res, 'Success get list', result);
});

const createTransfer = catchAsync(async (req, res) => {
  const { body, account } = req;
  body.userId = account.user.id;
  const result = await transferPaymentService.createTransfer(body);
  apiResponse(res, 'Success Created', result);
});

module.exports = {
  create,
  listCredit,
  listInvoice,
  createTransfer,
};
