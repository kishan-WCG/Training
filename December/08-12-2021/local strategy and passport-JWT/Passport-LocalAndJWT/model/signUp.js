let mongoose = require('mongoose');
let schema = mongoose.Schema;

let schemaModel = new schema({
    name : String,
    email : String,
    mobile: String,
    gender:String,
    password : String,
});

module.exports = mongoose.model('signUp', schemaModel)