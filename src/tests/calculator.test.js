// const { calculator } = require('../handlers/calculator'); // Adjust the path as per your project structure
// const { errorResponse } = require('../utils/errorresponse');
// const { successResponse } = require('../utils/successresponse');
// const { calculator: calculatorValidator } = require('../validation/calculator');
// const httpMocks = require('node-mocks-http');

// describe('Calculator Handler Tests', () => {
//     test('Valid input and division', async () => {
//         const req = httpMocks.createRequest({
//             method: 'POST',
//             body: JSON.stringify({ value1: 20, operator: '/', value2: 4 })
//         });
//         const res = httpMocks.createResponse();

//       const test = await calculator(req, res);
//         console.log("test",res.statusCode,res.data)
//         expect(res.statusCode).toBe(200);
//         //const responseData = JSON.parse(res._getData());
//         //expect(test.message).toBe('date get successfully');
//         //expect(responseData.data).toBe(5);
//     });

//     // test('Valid input and division', async () => {
//     //     const req = httpMocks.createRequest({
//     //         method: 'POST',
//     //         body: JSON.stringify({ value1: 20, operator: '/', value2: 4 })
//     //     });
//     //     const res = httpMocks.createResponse();

//     //     await calculator(req, res);

//     //     expect(res.statusCode).toBe(200);
//     //     expect(JSON.parse(res._getData())).toEqual({ message: 'data get successfully', data: 5 });
//     // });

//     // test('Division by zero error', async () => {
//     //     const req = httpMocks.createRequest({
//     //         method: 'POST',
//     //         body: JSON.stringify({ value1: 15, operator: '/', value2: 0 })
//     //     });
//     //     const res = httpMocks.createResponse();

//     //     await calculator(req, res);

//     //     expect(res.statusCode).toBe(400);
//     //     expect(JSON.parse(res._getData())).toEqual({ message: 'Division by zero error' });
//     // });

//     // test('Invalid operator', async () => {
//     //     const req = httpMocks.createRequest({
//     //         method: 'POST',
//     //         body: JSON.stringify({ value1: 8, operator: '%', value2: 3 })
//     //     });
//     //     const res = httpMocks.createResponse();

//     //     await calculator(req, res);

//     //     expect(res.statusCode).toBe(400);
//     //     expect(JSON.parse(res._getData())).toEqual({ message: 'Unsupported operator. Supported operators are +, -, *, /' });
//     // });

//     // test('Validation error', async () => {
//     //     const req = httpMocks.createRequest({
//     //         method: 'POST',
//     //         body: JSON.stringify({ value1: 10, operator: '+', value2: 'abc' })
//     //     });
//     //     const res = httpMocks.createResponse();

//     //     await calculator(req, res);

//     //     expect(res.statusCode).toBe(200);
//     //     expect(JSON.parse(res._getData())).toEqual({ message: '"value2" must be a number' });
//     // });

//     // test('Internal server error', async () => {
//     //     const req = httpMocks.createRequest({
//     //         method: 'POST',
//     //         body: JSON.stringify({ value1: 10, operator: '+', value2: 2 })
//     //     });
//     //     const res = httpMocks.createResponse();

//     //     // Mocking an error response from the calculator function
//     //     jest.spyOn(calculatorValidator, 'validate').mockRejectedValue(new Error('Internal server error'));

//     //     await calculator(req, res);

//     //     expect(res.statusCode).toBe(200);
//     //     expect(JSON.parse(res._getData())).toEqual({ message: 'Internal server error' });
//     // });
// });


// calculator.test.js

const { calculator } = require('../handlers/calculator');
const { errorResponse } = require('../utils/errorresponse');
const { successResponse } = require('../utils/successresponse');
const { calculatorValidator } = require('../validation/calculator');

// Mock request and response objects
const mockRequest = (body) => ({ body: JSON.stringify(body) });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock calculator.validate function
// jest.mock('../validation/calculator', () => ({
//     calculator: {
//         validate: jest.fn().mockResolvedValue({ error: null }) // Assuming validation passes
//     }
// }));

// Mock successResponse and errorResponse functions
jest.mock('../utils/successresponse', () => ({
    successResponse: jest.fn()
}));

jest.mock('../utils/errorresponse', () => ({
    errorResponse: jest.fn()
}));

describe('calculator handler function', () => {
    it('should correctly calculate the addition', async () => {
        const req = mockRequest({ value1: 5, value2: 3, operator: '+' });
        const res = mockResponse();

        await calculator(req, res);

        // Verify that successResponse was called with the correct arguments
        expect(successResponse).toHaveBeenCalledWith(req, res, 'date get successfully', 8);

        // Verify that errorResponse was not called
        expect(errorResponse).not.toHaveBeenCalled();
    });

    

    it('should handle invalid operator', async () => {
        const data = { value1: 5, value2: 3, operator: '%' };
        const validationResult = await calculatorValidator.validate(data)
        //console.log("validationResult");
        expect(validationResult.error).toBeDefined();
        expect(validationResult.error.details[0].message).toEqual('"operator" must be one of [+, -, *, /]');
    });



    // Additional test cases can be added for other operators (+, -, *, /) and edge cases
});
