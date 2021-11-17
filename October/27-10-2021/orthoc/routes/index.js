var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/index', async function(req, res) {
    try {
        var bodydata = {

            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
        }

        var user = user(bodydata)
        user.save()
    } catch (error) {
        console.log(error);
        res.redirect('/error')
    }
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/departments', function(req, res) {
    res.render('departments')
});

router.get('/doctors', function(req, res) {
    res.render('doctors')
});

router.get('/contact', function(req, res) {
    res.render('contact')
});

router.get('/signup', function(req, res) {
    res.render('signUp', { layout: "layoutOne" })
});
module.exports = router;