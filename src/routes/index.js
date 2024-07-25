var express = require('express');
var router = express.Router();
var usersRouter = require('./users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send([{"test":"WELCOME TO API GATEWAY AND USER MICROSERVICES"}]);
  /* res.json([{req, res, "WELCOME TO API GATEWAY AND USER MICROSERVICES"}]) */
  //res.render('index', { title: 'Express' });
});
router.use('/users', usersRouter);

module.exports = router;
