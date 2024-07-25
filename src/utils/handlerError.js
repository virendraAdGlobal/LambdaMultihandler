'use strict';

module.exports.handlerError = async (event, context, callback) => {
  try {
    const handler = context.functionName; // get the actual handler name
    const response = await handler(event, context);
    return response;
  } catch (error) {
    console.error('Error caught by handlerError:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
    };
  }
};
