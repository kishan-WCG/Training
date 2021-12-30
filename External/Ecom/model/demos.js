const mongoose = require('mongoose')


var DemoSchema = mongoose.Schema({

    name: String,
    email: String,
    Number: String,
    password: String,

})

module.exports = mongoose.model('democ', DemoSchema)