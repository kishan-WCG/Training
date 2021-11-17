var express = require('express');
const User = require('../model/User');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    var user = await User.find().lean();
    res.json(user);
});

module.exports = router;