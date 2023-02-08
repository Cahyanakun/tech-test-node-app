const Joi = require('joi');
const { password, email } = require('../common/validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'Email harus diisi.',
      'string.email': 'Email tidak valid.',
    }),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'Kata sandi harus diisi.',
      })
      .custom(password),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    emailOrPhoneNum: Joi.custom(email),
    password: Joi.string().required().messages({
      'string.empty': 'Kata sandi harus diisi.',
    }),
    isAdmin: Joi.bool().required(),
  }),
};

module.exports = {
  register,
  login,
};
