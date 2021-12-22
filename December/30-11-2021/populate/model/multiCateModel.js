const mongoose = require('mongoose');

const productMany = mongoose.Schema({
    productName:String,
    _category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
    },
],
});

module.exports = mongoose.model('manyToManyProduct', productMany,'manyToManyProduct');