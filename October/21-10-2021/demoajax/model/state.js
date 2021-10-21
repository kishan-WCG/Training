var mongoose = require('mongoose');

var StateSchema = mongoose.Schema({

    statename: String,
    _country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country'
    }
})

module.exports = mongoose.model('state', StateSchema)