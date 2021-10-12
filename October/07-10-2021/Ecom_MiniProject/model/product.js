const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productname: String,
    productdetails: String,
    productprice: String,
    img: String

})

module.exports = mongoose.model('product', productSchema);