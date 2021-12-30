const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const url = "mongodb://login:login@localhost:27017/login";

const connect = mongoose.connect(url, { useNewUrlParser: true });
module.exports = connect;