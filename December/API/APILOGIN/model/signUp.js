let mongoose = require('mongoose');
let schema = mongoose.Schema;

let schemaModel = new schema({
    name : String,
    email : String,
    password : String,
});

module.exports = mongoose.model('SignUp', schemaModel)