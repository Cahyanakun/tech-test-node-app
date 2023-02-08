const Joi = require('joi');

const createData = {
  body: Joi.object().keys({
    carId: Joi.number().required(),
    leasingId: Joi.number().required(),
    countTerm: Joi.number().required(),
  }),
};

const createTransfer = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    invoiceId: Joi.number().required(),
  }),
};

module.exports = {
  createData,
  createTransfer,
};
