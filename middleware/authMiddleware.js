// const serverlessMiddleware = require('serverless-middleware');
// const passport = require('../utils/passport');

// exports.authenticateJWT = serverlessMiddleware((req, res, next) => {
// //console.log("test");
// passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (err || !user) {
//       res.status(401).json({ message: 'Unauthorized' });
//       return;
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// });

// const passport = require('passport');

// const authenticate = (req, res, next) => {
//     // Authentication logic using Passport.js
//     console.log("test");
//     next();
// };

// module.exports = authenticate;

// module.exports = {
//     authenticateJWT,
// };

// authMiddleware.js

// const passport = require('../utils/passport');

// const authenticateJWT = (req, res, next) => {
//     console.log("dfshfhdsvvvv");
//     passport.authenticate('jwt', { session: false }, (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
//         req.user = user;
//         next();
//     })(req, res, next);
// };

// module.exports = { authenticateJWT };


// const authenticate = async (event, context) => {
//     console.log("testftsvhdfhvsdhgfhdmf");
//     if (context.prev === undefined) {
//       // Previous middleware handler didn't return. End execution.
//       context.end();
//       return {
//         statusCode: 200,
//         body: 'No results',
//       };
//     }
  

//   };


const authenticate = async (event, context) => { console.log("fdhghdfgvirendra") };
// 'use strict';

// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'your_jwt_secret_key';
// console.log("fdhfdfdsf");
// const authenticate = (req, res, next) => {
//     console.log("test");
//    // next(); 
//   // Get the token from the request headers
// //   const token = req.headers.authorization;

// //   // Verify the token
// //   jwt.verify(token, SECRET_KEY, (err, decoded) => {
// //     if (err) {
// //       // Token verification failed
// //       return res.status(401).json({ message: 'Unauthorized' });
// //     } else {
// //       // Token is valid
// //       req.user = decoded; // Attach user information to the request object
// //       next(); // Proceed to the next middleware or handler
// //     }
// //   });
// };

module.exports = { authenticate };


