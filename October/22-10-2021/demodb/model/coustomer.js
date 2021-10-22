var mongoose = require('mongoose')

var coustomerSchema = mongoose.Schema({

    name: String,
    email: String,
    otherInfo: {
        address: String,
        gender: String
    }
})

module.exports = mongoose.model('coustomer', coustomerSchema)