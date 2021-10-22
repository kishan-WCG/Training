var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('welcome')
})
router.post('/', function(req, res) {

})
router.get('/coustomer', function(req, res) {
    res.render('coustomer')
})

router.post('/coustomer', function(req, res) {

})




module.exports = router;