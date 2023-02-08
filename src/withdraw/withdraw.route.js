const express = require('express');
const queryParser = require('../middlewares/query-parser.middleware');
const validate = require('../middlewares/validation.middleware');
const { auth, authAdmin } = require('../middlewares/auth.meddleware');
const withdrawController = require('./withdraw.controller');
const { getWithdraws } = require('./withdraw.middleware');
const withdrawValidation = require('./withdraw.validation');
const querySearch = require('../middlewares/query-search.middleware');

const router = express.Router();

router.get('/', auth(), queryParser, withdrawController.list);

router.post(
  '/',
  auth(),
  validate(withdrawValidation.createData),
  queryParser,
  withdrawController.create
);

router.route('/:id/approve').get(authAdmin(), getWithdraws, withdrawController.approvalStatus);

module.exports = router;
