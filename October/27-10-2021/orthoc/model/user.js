var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    name: String,
    email: String,
    address: String,
    password: String,

});

module.exports = mongoose.model('user', userSchema)