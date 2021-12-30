const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    password: String,
    email: String,
    username: String,
    uuid: String,
})

module.exports = mongoose.model("admin", adminSchema);