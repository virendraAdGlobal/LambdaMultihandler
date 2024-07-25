const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
  min: 8,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};
const {
  otherField,
  login
} = require("./messages/hrmodulemessage");
module.exports.login = Joi.object({
  username: Joi.string().required().messages(login),
  password: Joi.string().required()
});
