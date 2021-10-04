var express = require('express');
const city = require('../model/city');
const state = require('../model/state');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/', function(req, res) {

    var body = {
        state: req.body.state,
        city: req.body.city
    }

    var data = new state(body)

    data.save((err) => {
        if (err) {
            console.log('Error in insert Record');
        } else {
            console.log('Record Inserted')
            res.redirect('/')
        }
    })
});

module.exports = router;