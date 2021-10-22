var express = require('express');
var router = express.Router();


router.get('/coustomer', function(req, res) {
    res.render('coustomer')
})

router.post('/coustomer', function(req, res) {

})


module.exports = router