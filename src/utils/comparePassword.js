const bcrypt = require('bcryptjs');

exports.comparePassword = function (inputPassword, hashedPassword, callback) {
    bcrypt.compare(inputPassword, hashedPassword, function(err, isMatch) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, isMatch);
        }
    });
};
