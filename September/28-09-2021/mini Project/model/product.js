var mongoose = require('mongoose')
var schema = mongoose.Schema;

var myschema = new schema({
    name: String,
    price: String,
    cate: String,
    des: String,
    text: String
        // proimg: String,

});

module.exports = mongoose.model('product', myschema)