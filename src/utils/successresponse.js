// Handle errors appropriately
exports.successResponse = (req, res, message, data = {}) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: true,
      message: message,
      data: data
    })
  }
};