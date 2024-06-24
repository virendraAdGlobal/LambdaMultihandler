const Joi = require("joi");
module.exports.calculatorValidator = Joi.object({
  value1: Joi.number().required(),
  value2: Joi.number().required(),
  operator: Joi.string().valid('+', '-', '*', '/').required()
});
