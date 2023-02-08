const express = require('express');
const queryParser = require('../middlewares/query-parser.middleware');
const validate = require('../middlewares/validation.middleware');
const { authAdmin, auth } = require('../middlewares/auth.meddleware');
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');
const userValidation = require('./user.validation');
const querySearch = require('../middlewares/query-search.middleware');

const router = express.Router();

router.get('/', authAdmin(), queryParser, querySearch('fullName'), userController.list);

router.get('/me', auth(), userController.getMe);

router.post(
  '/',
  authAdmin(),
  validate(userValidation.createData),
  queryParser,
  userController.create
);

router.get('/:id', authAdmin(), userMiddleware.getUser, queryParser, userController.show);

router.put(
  '/:id',
  authAdmin(),
  validate(userValidation.updateData),
  userMiddleware.getUser,
  queryParser,
  userController.update
);

router.delete('/:id', authAdmin(), userMiddleware.getUser, queryParser, userController.destroy);

module.exports = router;
