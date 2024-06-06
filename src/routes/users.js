var express = require('express');
var router = express.Router();
const { users,usersHello
} = require("../controller/userController");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get("/", users);
router.get("/hello", usersHello);
module.exports = router;
