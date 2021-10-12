var mongoose = require('mongoose')
var schema = mongoose.Schema;

var myschema = new schema({
    name: String,
    price: String,
    cate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    des: String,
    add: String


});

module.exports = mongoose.model('product', myschema)