const middleware = require('serverless-middleware');
const { authenticate } = require('./authMiddleware');
exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      input: event,
    }),
  };
};
//module.exports.hello = new middleware(hello).use(authenticate);



