const mongoose = require('mongoose');

const cateSchema = mongoose.Schema({
  categoryName: String,
});

module.exports = mongoose.model("category", cateSchema, "category");
