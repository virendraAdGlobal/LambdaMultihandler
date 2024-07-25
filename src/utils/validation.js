/* const createHttpError = require("http-errors");
//* Include joi to check error type
const Joi = require("joi");
//* Include all validators
//let { errorResponse } = require('../utils/errorresponse');


const Validators = require("../validation/index");

module.exports = function (validator) {
    //! If validator is not exist, throw err
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`);

    return async function (req, res, next) {
        try {
            let validated;

            switch (req.method) {
                case 'GET':
                    validated = await Validators[validator].validateAsync(req.query);
                    req.params = validated;
                    break;
                case 'POST':
                case 'PUT':
                case 'PATCH':
                    validated = await Validators[validator].validateAsync(req.body);
                    req.body = validated;
                    break;
                case 'DELETE':
                    validated = await Validators[validator].validateAsync(req.params);
                    req.params = validated;
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${req.method}`);
            }

            next();
        } catch (error) {
            // Pass err to next
            if (error.isJoi) {
                return {
                        error: error,
                        status:422
                    }
               // return  errorResponse(res, error.message, 422, error, {});
                // res.status(422).json({
                //     err: err,
                //     status: "warning",
                //     message: err.message,
                // });
                
            } else {
                return {
                    error: error,
                    status:500
                }
                //console.log("middifels");
                //return  errorResponse(res, error.message, 500, error, {});
                // res.status(500).json({
                //     err: err,
                //     status: "error",
                //     message: "Internal server error",
                // });
            }
        }
    };

}; */

const createHttpError = require('http-errors');
const Joi = require('joi');
const Validators = require("../validation/index");

module.exports = function (validator) {
  // If validator does not exist, throw an error
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator does not exist`);
  }

  return async function (req, res, next) {
    try {
      let validated;

      switch (req.method) {
        case 'GET':
          validated = await Validators[validator].validateAsync(req.query);
          req.query = validated; // Fix: use req.query instead of req.params
          break;
        case 'POST':
        case 'PUT':
        case 'PATCH':
          validated = await Validators[validator].validateAsync(req.body);
          req.body = validated;
          break;
        case 'DELETE':
          validated = await Validators[validator].validateAsync(req.params);
          req.params = validated;
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${req.method}`);
      }

      next();
    } catch (err) {
      if (err.isJoi) {
        // res.status(422).json({
        //   error: err,
        //   status: 'warning',
        //   message: err.message,
        // });
        return {
            statusCode: 422,
            body: JSON.stringify({
              status: false,
              message:err.message,
              error: {
                statusCode:422,
                message:err.message,
                error:err,
              },
            })
          }
      } else {
        return {
            statusCode: 500,
            body: JSON.stringify({
              status: false,
              message:err.message,
              error: {
                statusCode:500,
                message:err.message,
                error:err,
              },
            })
          }
        // res.status(500).json({
        //   error: err,
        //   status: 'error',
        //   message: 'Internal server error',
        // });
      }
    }
  };
};
