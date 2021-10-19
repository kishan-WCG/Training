const mongoose = require('mongoose')
const state = require('../model/state')
const cityschema = mongoose.Schema({

    cityname: String,
    _state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state'
    }
})
module.exports = mongoose.model('city', cityschema);