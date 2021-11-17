var express = require('express');
var router = express.Router();
var user = require('../model/user');
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/index', async function(req, res) {
    var solt = bcrypt.genSaltSync(10);
    var bodydata = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, solt)
    }

    var data = new user(bodydata)
    data.save((error) => {
        if (error) {
            console.log('Error During the insert Record');
        } else {
            console.log('Record Insert .!');
            console.log(data);
            // res.redirect('')
        }
    })

});

router.get('/login', function(req, res) {

    res.render('login')
})
router.post('/login', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    user.findOne({ email: email }).lean().then((data) => {

        if (data == null) {
            res.send('Invalid data ')
        } else {
            var becryptPass = bcrypt.compareSync(req.body.password, data.password);
            console.log(bool);
            if (becryptPass == false) {
                res.send('Invalid Password')
            } else {
                res.send('logined')
                console.log('Login');
            }
        }
    }).catch()
});

module.exports = router;