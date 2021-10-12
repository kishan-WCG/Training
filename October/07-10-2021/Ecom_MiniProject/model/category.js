const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    categoryname: String

})

module.exports = mongoose.model('category', adminSchema);