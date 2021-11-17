var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')


/* GET home page. */
router.get('/', async function(req, res, next) {

    var response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&APPID=fe51c92dee47c91adf48c94eeaefb343')
    var weather = await response.json()
        // console.log(weather);
    console.log(weather.name);
    res.render('index', { weather });
});

module.exports = router;