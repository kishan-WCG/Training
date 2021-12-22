const mongoose = require('mongoose');

let fieldSchema = mongoose.Schema({
    fields: []
});

module.exports = mongoose.model('fields', fieldSchema);