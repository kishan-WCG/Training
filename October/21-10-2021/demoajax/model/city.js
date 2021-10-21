var mongoose = require('mongoose');

var citySchema = mongoose.Schema({

    cityname: String,
    _state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state'
    }
})

module.exports = mongoose.model('city', citySchema)