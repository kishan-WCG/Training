const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: String,
    mobileNo: String,
    address: String

})

module.exports = mongoose.model('apiData', userSchema, 'apiData')