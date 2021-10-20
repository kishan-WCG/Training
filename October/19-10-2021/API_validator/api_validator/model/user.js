const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    number: String,
    password: String
})

module.exports = mongoose.model('apimodel', UserSchema);