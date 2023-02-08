const express = require('express');
const validate = require('../middlewares/validation.middleware');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', validate(authValidation.login), authController.login);
module.exports = router;
