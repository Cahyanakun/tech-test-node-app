const express = require('express');
const queryParser = require('../middlewares/query-parser.middleware');
const validate = require('../middlewares/validation.middleware');
const { authAdmin } = require('../middlewares/auth.meddleware');
const adminController = require('./admin.controller');
const adminMiddleware = require('./admin.middleware');
const adminValidation = require('./admin.validation');
const querySearch = require('../middlewares/query-search.middleware');

const router = express.Router();

router.get('/', authAdmin(), queryParser, querySearch('fullName'), adminController.list);

router.post(
  '/',
  authAdmin(),
  validate(adminValidation.createData),
  queryParser,
  adminController.create
);

router.get('/:id', authAdmin(), adminMiddleware.getAdmin, queryParser, adminController.show);

router.put(
  '/:id',
  authAdmin(),
  validate(adminValidation.updateData),
  adminMiddleware.getAdmin,
  queryParser,
  adminController.update
);

router.delete('/:id', authAdmin(), adminMiddleware.getAdmin, queryParser, adminController.destroy);

module.exports = router;
