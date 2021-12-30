const mongoose = require('mongoose')

const subSchema = mongoose.Schema({

    subcategory: String,
    _subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'

    }
})

module.exports = mongoose.model('demosub', subSchema)