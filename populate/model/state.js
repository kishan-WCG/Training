var mongoose = require('mongoose')
var schema = mongoose.Schema;

var myschema = new schema({
    state: String

});

module.exports = mongoose.model('state', myschema)