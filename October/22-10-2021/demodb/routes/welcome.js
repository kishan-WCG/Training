const {} = require("../app")
var express = require('express');
var router = express.Router();




router.get('/', function(req, res) {
    res.render('welcome')

})

router.post('/', async function(req, res) {


})


// router.get('/coustomer', function(req, res) {
//     res.render('coustomer')
// })

// router.post('/coustomer', async function(req, res) {

//  

// })



module.exports = router;