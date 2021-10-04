var mongoose = require('mongoose')
var schema = mongoose.Schema;

var myschema = new schema({
    uname: String,
    password: String


});

module.exports = mongoose.model('populate', myschema)