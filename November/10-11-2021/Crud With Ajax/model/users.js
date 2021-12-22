const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    fName: String,
    lName: String,
    address: String,
    gender: String,
    interest: String,
    hobbies: [String],
    image: String

})
module.exports = mongoose.model('userInfo', userSchema);