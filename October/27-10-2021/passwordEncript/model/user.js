var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String,
})

module.exports = mongoose.model('user', UserSchema)