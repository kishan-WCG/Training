const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

        title : String,
        price : String,
        images : String,
        details : String,

})

module.exports = mongoose.model("product",productSchema);