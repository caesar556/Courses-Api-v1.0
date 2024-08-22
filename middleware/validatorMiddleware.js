const { validationResult } = require('express-validator');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
// @desc  handle validation logic
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
      return next(error);
  }
  next()
};

module.exports = validatorMiddleware;
