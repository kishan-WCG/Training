const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    photo: String,
    _area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'area'
    }
})

module.exports = mongoose.model('user', userSchema);