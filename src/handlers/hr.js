'use strict';
//var express = require('express');
//require('dotenv').config();
//const connectDB = require('../utils/db');
let { errorResponse } = require('../utils/errorresponse');
let { successResponse } = require('../utils/successresponse');
let { comparePassword } = require('../utils/comparePassword');
let { login } = require('../validation/hrmodulevalidation');
const validator= require("../utils/validation")
const {modelName,connecthChatSchema} = require('../models/user');
const {connectToDatabase} =require('../utils/db');
const {getModel} =require('../utils/getmodel');
var bcrypt = require('bcryptjs');

// Ensure the database connection is established
//connectDB();
//console.log("process.env",process.env.PORT)
const hrHandler = {
    users: async (req, res) => {
       // console.log("test",req.body);
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
                const User = getModel(connection, modelName, connecthChatSchema);

            // Example operation
            //const result = await User.find({});
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
            const User = getModel(connection, modelName, connecthChatSchema);

            // Example operation
            //const result = await User.find({});
            const { username, password } = JSON.parse(req.body);
           
            const user = await User.findOne({username});
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
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

