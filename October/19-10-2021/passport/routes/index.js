var express = require('express');
var router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const user = mongoose.model('user', UserSchema);















module.exports = router;