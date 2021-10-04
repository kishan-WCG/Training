var mongoose = require('mongoose')
var schema = mongoose.Schema;

var myschema = new schema({
    city: String,
    _stateby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "state"
    }
});


module.exports = mongoose.model('city', myschema);