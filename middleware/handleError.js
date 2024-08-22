const httpStatusText = require('../utils/httpStatusText');

const handleError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message,
    code: err.statusCode || 500,
    data: null,
    stack: err.stack
  })
}
module.exports = handleError;