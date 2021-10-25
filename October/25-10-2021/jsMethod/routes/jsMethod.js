var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

    res.render('jsMethod', { message: 'This is a Home Page !' })
});


module.exports = router;