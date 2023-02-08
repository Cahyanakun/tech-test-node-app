const Joi = require('joi');

const createData = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().optional(),
    bod: Joi.string().optional(),
    address: Joi.string().optional(),
  }),
};

const updateData = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    bod: Joi.string().optional(),
    address: Joi.string().optional(),
  }),
};

module.exports = {
  createData,
  updateData,
};
