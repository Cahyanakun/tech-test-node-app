const httpStatus = require('http-status');
const { verifyToken } = require('../common/helper/auth');
const tokenTypes = require('../common/enum/tokens');
const ApiError = require('../common/helper/ApiError');
const accountService = require('../account/account.service');

const auth = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer abc

    verifyToken(token, async (err, payload) => {
      if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
      if (payload.type !== tokenTypes.ACCESS)
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Bad token'));
      const { accountId, isAdmin } = payload;
      req.account = await accountService.findByIdWithProfile(accountId, isAdmin);
      req.isAdmin = isAdmin;
      next();
    });
  };
};

const authAdmin = (roles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer abc

    verifyToken(token, async (err, payload) => {
      if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
      if (payload.type !== tokenTypes.ACCESS)
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Bad token'));
      const { accountId, isAdmin } = payload;
      req.account = await accountService.findByIdWithProfile(accountId, isAdmin);
      if (!isAdmin || !req.account.isAdmin) {
        return next(new ApiError(httpStatus.FORBIDDEN, 'Can be accessed by admin only'));
      }
      req.isAdmin = isAdmin;
      next();
    });
  };
};

module.exports = {
  auth,
  authAdmin,
};
