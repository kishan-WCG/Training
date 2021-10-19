const mongoose = require('mongoose')

const state_schema = mongoose.Schema({

    statename: String,

})

module.exports = mongoose.model('state', state_schema)