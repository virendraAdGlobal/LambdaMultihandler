const { errorResponse } = require('../utils/errorresponse');
const { successResponse } = require('../utils/successresponse');
const { calculatorValidator } = require('../validation/calculator');
const fs = require('graceful-fs');

// Your code that uses fs operations

exports.calculator = async (req, res) => {
    try{
        const reqdata = JSON.parse(req.body)
        const { error } = await calculatorValidator.validate(reqdata)
        if (error) {
            return errorResponse(res, error.details[0].message, 400, error, {}) 
        }
        const {value1,value2,operator}=reqdata
        // Perform calculation based on the operator
        let result;
        switch (operator) {
            case '+':
                result = value1 + value2;
                break;
            case '-':
                result = value1 - value2;
                break;
            case '*':
                result = value1 * value2;
                break;
            case '/':
                if (value2 === 0) {
                    return  errorResponse(res, "Division by zero error.", 400, {}, {});
                }
                result = value1 / value2;
                break;
            default:
                return  errorResponse(res, "Unsupported operator. Supported operators are +, -, *, /", 400, {}, {});
        }

        //Prepare the response
        return successResponse(req, res, 'date get successfully', result)
    } catch (error) {
        return  errorResponse(res, error.message, 500, error, {});
    }
};
