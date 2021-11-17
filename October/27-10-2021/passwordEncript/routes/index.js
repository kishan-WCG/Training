var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/index', async function(req, res) {
    try {
        var solt = bcrypt.genSaltSync(10);
        var bodyuser = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            // password: await bcrypt.hash(req.body.password, solt)
        }
        console.log(bodyuser);
        var user = user(bodyuser)
        user.save();
        res.redirect('/login')
        console.log('data');
    } catch (error) {
        console.log(error);
        console.log('error');
        res.redirect('/error')
    }
});

router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/login', function(req, res, next) {

});

module.exports = router;