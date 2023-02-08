const Joi = require('joi');

const createData = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

module.exports = {
  createData,
};
