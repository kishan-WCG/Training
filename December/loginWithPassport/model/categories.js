let mongoose = require('mongoose');
let schema = mongoose.Schema;

let myschema = new schema({
    cateName:String,
});
module.exports = mongoose.model('categories', myschema)
