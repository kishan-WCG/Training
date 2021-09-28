var mongoose = require('mongoose')
var schema = mongoose.Schema;

var myschema = new schema({
    name : String,
    email : String,
    gender : String,
    dob : String,
    password : String,
    address : String,
    city : String,
    age : String,
    phone : String,
    skype : String,
});

module.exports = mongoose.model('SignUp',myschema)