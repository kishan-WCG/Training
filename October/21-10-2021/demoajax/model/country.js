var mongoose = require('mongoose')

var countryShema = mongoose.Schema({

    countryname: String

})

module.exports = mongoose.model('country', countryShema)