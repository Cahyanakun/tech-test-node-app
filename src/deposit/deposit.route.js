const express = require('express');
const queryParser = require('../middlewares/query-parser.middleware');
const validate = require('../middlewares/validation.middleware');
const { auth, authAdmin } = require('../middlewares/auth.meddleware');
const depositController = require('./deposit.controller');
const { getDeposit } = require('./deposit.middleware');
const depositValidation = require('./deposit.validation');
const querySearch = require('../middlewares/query-search.middleware');

const router = express.Router();

router.get('/', auth(), queryParser, depositController.list);

router.post(
  '/',
  auth(),
  validate(depositValidation.createData),
  queryParser,
  depositController.create
);

router.route('/:id/approve').get(authAdmin(), getDeposit, depositController.approvalStatus);

module.exports = router;
