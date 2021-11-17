var mongoose = require('mongoose');

var UserSchema = ({

    name: String,
    email: String,
    password: String

});

module.exports = mongoose.model('user', UserSchema)