var express = require('express');
const country = require('../model/country');
const state = require('../model/state');
const city = require('../model/city');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    var dbcountry = await country.find().lean();
    // var dbstate = await state.find();
    // var dbcity = await city.find();
    res.render('index', { dbcountry });

});

router.post('/', async function(req, res, next) {
    var bodydata = {
        countryname: req.body.countryname
    }
    console.log(bodydata);
    var data = new country(bodydata)
    console.log(data);
    var datan = await data.save()
    if (!datan) {
        console.log('Data is Null');
    } else {
        res.redirect('/index')
    }
});
router.get('/country', async function(req, res, next) {
    try {
        var dbcountry = await country.find().lean();
        console.log(dbcountry);
        res.render('country', { dbcountry })
    } catch {
        console.log(error);
    }
});

router.post('/country', async function(req, res, next) {
    var bodydata = {
        countryname: req.body.countryname
    }
    console.log(bodydata);
    var data = new country(bodydata)
    console.log(data);
    var datan = await data.save()
    if (!datan) {
        console.log('Data is Null');
    } else {
        res.redirect('/state')
    }
});

router.get('/state/:id', async function(req, res) {
    try {
        var data = await state.find({ _country: req.params.id }).lean().populate('_country')
            // console.log(data);
        res.json({ data })
    } catch {
        console.log(error)
    }
})



router.get('/state', async function(req, res, next) {
    try {
        var dbcountry = await country.find().lean()
            // console.log(dbstate);
        res.render('state', { dbcountry })

    } catch {
        console.log(err);
    }
    res.render('state')
});
router.post('/state', async function(req, res, next) {
    var bodydata = {
        statename: req.body.statename,
        _country: req.body._country

    }
    console.log(bodydata);

    var data = new state(bodydata)
    console.log(data);
    try {
        var datan = await data.save()
        if (!datan) {
            console.log('Data is Null');
        } else {
            res.redirect('/city')
        }
    } catch {
        console.log(err);
    }

});

router.get('/city/:id', async function(req, res) {
    try {

        var cdata = await city.find({ _state: req.params.id }).lean()
        console.log(cdata);
        res.json({ cdata })
    } catch {
        console.log('error During the City Populate');
    }


})


router.get('/city', async function(req, res, next) {
    try {
        var statedata = await state.find().lean()
        console.log(statedata);
        res.render('city', { statedata });
    } catch {
        console.log('Error duting the City Get ');
    }
});
router.post('/city', async function(req, res, next) {
    var bodydata = {
        cityname: req.body.cityname,
        _state: req.body._state

    }
    console.log(bodydata);

    var data = new city(bodydata)
    console.log(data);
    try {
        var datan = await data.save()
        if (!datan) {
            console.log('Data is Null');
        } else {
            res.redirect('/')
        }
    } catch {
        console.log(err);
    }

});

module.exports = router;