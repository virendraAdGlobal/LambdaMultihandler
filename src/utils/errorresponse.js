//const winstonlogger = require('../utils/logger');
// Handle errors appropriately
exports.errorResponse = (res, message, statusCode = 500, error = {}, req) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      status: false,
      message,
      error: {
        statusCode,
        message,
        error,
      },
    })
  }
  // include winston logging
  // winstonlogger.error(
  //   `${statusCode || 500} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  // );
};
