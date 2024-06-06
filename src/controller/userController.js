const User = require('../models/user');
let { errorResponse } = require('../utils/errorresponse');

const users = async (req, res, next) => {
    try {
      let data = await User.find({});
      
    res.send(data)
      //successResponse(req, res, "success", response);
    } catch (error) {
      //console.error(error);
      errorResponse(res, error.message, error.status, error, {});
    }
  };
  const usersHello = async (req, res, next) => {
    try {
      let data = {data:"hello"}
      
    res.send(data)
      //successResponse(req, res, "success", response);
    } catch (error) {
      console.error(error);
      //errorResponse(res, error.message, 401, error, {});
    }
  };

  module.exports = {
    users,usersHello
  };