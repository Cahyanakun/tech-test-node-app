const express = require('express');
const queryParser = require('../middlewares/query-parser.middleware');
const validate = require('../middlewares/validation.middleware');
const { auth, authAdmin } = require('../middlewares/auth.meddleware');
const transactionController = require('./transaction.controller');
const { getTransaction } = require('./transaction.middleware');
const transactionValidation = require('./transaction.validation');
const querySearch = require('../middlewares/query-search.middleware');

const router = express.Router();

router.get('/', auth(), queryParser, querySearch(), transactionController.listCredit);

router.get('/invoice', auth(), queryParser, transactionController.listInvoice);

router.post(
  '/',
  auth(),
  validate(transactionValidation.createData),
  queryParser,
  transactionController.create
);

router.post(
  '/transfer',
  auth(),
  validate(transactionValidation.createTransfer),
  queryParser,
  transactionController.createTransfer
);

module.exports = router;
