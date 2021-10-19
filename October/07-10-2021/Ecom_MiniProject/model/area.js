const mongoose = require('mongoose')
const city = require('./city')

const areaSchema = mongoose.Schema({

    areaname: String,
    _city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    }

})
module.exports = mongoose.model('area', areaSchema)