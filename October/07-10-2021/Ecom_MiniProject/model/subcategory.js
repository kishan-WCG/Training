const mongoose = require('mongoose');
const category = require('./category');

const adminSchema = mongoose.Schema({
    subcategoryname: String,
    _category :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'category'
    }

})

module.exports = mongoose.model('subcategory', adminSchema);