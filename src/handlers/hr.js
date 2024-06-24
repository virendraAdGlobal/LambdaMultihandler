'use strict';
const { errorResponse } = require('../utils/errorresponse');
const { successResponse } = require('../utils/successresponse');
const { comparePassword } = require('../utils/comparePassword');
const { login } = require('../validation/hrmodulevalidation');
const validator= require("../utils/validation")
const {modelName,userSchema} = require('../models/user');
const {connectToDatabase} =require('../utils/db');
const {getModel} =require('../utils/getmodel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
//const authMiddleware = require('./authMiddleware');
const fs = require('graceful-fs');

// Your code that uses fs operations



const hrHandler = {
    users: async (req, res) => {
       // console.log("test",req.body);
        try {
           // authMiddleware(req, res);
            const { error } =login.validate(JSON.parse(req.body))
            if (error) {
                return errorResponse(res, error.details[0].message, 400, error, {}) 
              }
            const dbName1 = process.env.dbName1; // The database name can be passed in the event
            const dbUri1 =process.env.MONGOURI1;
            const dbName =process.env.dbName // The database name can be passed in the event
            const dbUri = process.env.MONGOURI; // URI from environment variable

            const connection = await connectToDatabase(dbUri1, dbName1);

            // Get or create the model for the connection
                const User = getModel(connection, modelName, userSchema);

            const { username, password } = req.body;
            const profile = await User.findOne({});
            return successResponse(req, res, "user get successful", profile);
        } catch (error) {
            return  errorResponse(res, error.message, 304, error, {});
        }
    },
    login: async (req, res) => {
        try {
            const { error } =login.validate(JSON.parse(req.body))
            if (error) {
                return errorResponse(res, error.details[0].message, 400, error, {}) 
              }
            const dbName1 = process.env.dbName1; // The database name can be passed in the event
            const dbUri1 =process.env.MONGOURI1;
            const dbName =process.env.dbName // The database name can be passed in the event
            const dbUri = process.env.MONGOURI; // URI from environment variable

            const connection = await connectToDatabase(dbUri1, dbName1);

            // Get or create the model for the connection
            const User = getModel(connection, modelName, userSchema);
            const { username, password } = JSON.parse(req.body);
           
            let user = await User.findOne({username}).lean();
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    const userObj ={
                        username:username
                    }
                    var token = jwt.sign(
                        JSON.parse(JSON.stringify(userObj)),
                        process.env.JWT_SECRET_KEY,
                        {
                          expiresIn: "30m",
                        }
                      );
                      //   let data = {};
                      //   data.user = user
                      user.token = token;
                     // console.log(user);
                    return successResponse(req, res, 'Login successfully', user) 
                }else{
                    return errorResponse(res, 'Invalid credentials', 401, {}, {}) 
                }
                
            } else {
                return errorResponse(res, 'Invalid credentials', 401, {}, {}) 
            }
        } catch (error) {
            return errorResponse(res, 'Something went Wrong', 500, error, {}) 
        }
    }
};

module.exports = { hrHandler };

