var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
let { errorResponse } = require('./utils/errorresponse');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', indexRouter);



var port = process.env.PORT || '3000';

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


mongoose.connect(process.env.MONGOURI, { 
  });



app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  errorResponse(res, err.message, err.status, err, req);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});

module.exports = app;
