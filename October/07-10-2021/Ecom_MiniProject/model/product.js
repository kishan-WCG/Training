const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productname: String,
    productdetails: String,
    productprice: String,
    img: String,
    _subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },



})

module.exports = mongoose.model('product', productSchema);