'use strict';
const User = require('../models/user');
require('dotenv').config();
const connectDB = require('../utils/db');
let { errorResponse } = require('../utils/errorresponse');
let { successResponse } = require('../utils/successresponse');
const fs = require('graceful-fs');

// Your code that uses fs operations


// Ensure the database connection is established
connectDB();

const onboardHandler = {
    profile: async (req, res) => {
        try {
            const profile = await User.findOne({});
            successResponse(req, res, "profile get successful", profile);
        } catch (error) {
            errorResponse(res, error.message, error.status, error, {});
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username, password });
            if (user) {
                //res.json({ message: 'Login successful' });
                successResponse(req, res, "Login successful", user);
            } else {
                //res.status(401).json({ message: 'Invalid credentials' });
                errorResponse(res, 'Invalid credentials', error.status, error, {});
            }
        } catch (error) {
            errorResponse(res, error.message, error.status, error, {});
        }
    }
};

module.exports = { onboardHandler};

