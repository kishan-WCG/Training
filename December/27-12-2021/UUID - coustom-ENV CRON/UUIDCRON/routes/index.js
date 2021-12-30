var express = require('express');
var router = express.Router();
var moment = require('moment'); // require

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/date', function(req, res, next) {
    res.render('date');
});

router.post('/date', function(req, res, next) {
    try {

        let a = req.body.dob.split("-")
        let ll = a[1] + a[0];
        var time = moment();
        var year = moment(ll, 'MM-YYYY');
        console.log('************');
        var age = moment.duration(time.diff(year));
        console.log(age)
        var years = age.years();
        var months = age.months();
        var day = age.days('a');

        let days = "The age is " + years + " years " + months + " months " + day + " Days ";
        console.log(days)

    } catch (errro) {
        console.log(errro);
        res.json({
            type: "errro",
            message: "Error During the Birthdates...",
        })
    }

});


module.exports = router;