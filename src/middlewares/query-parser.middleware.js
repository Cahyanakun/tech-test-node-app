const httpStatus = require('http-status');
const ApiError = require('../common/helper/ApiError');
const qp = require('../common/helper/queryParser');

const queryParser = (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    req.query = qp(req.query);
    req.query.offset = (page - 1) * limit;
    req.query.limit = Number(limit) || 10;
    next();
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query'));
  }
};

module.exports = queryParser;
