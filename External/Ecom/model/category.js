const mongoose = require('mongoose')

var Categor_Schema = mongoose.Schema({

    category: String
})

module.exports = mongoose.model('democategory', Categor_Schema)