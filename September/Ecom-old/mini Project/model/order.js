const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signUp'
    },
    products_ref: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
});

module.exports = mongoose.model("order", orderSchema);