let mongoose = require('mongoose')
let schema = mongoose.Schema;

var myschema = new schema({
    name : String,
    email : String,
    password : String,

});

module.exports = mongoose.model('SignUp',myschema)