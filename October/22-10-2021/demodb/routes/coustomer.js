var express = require('express');
const coustomer = require('../model/coustomer');
var router = express.Router();



router.get('/', function(req, res) {
    res.render('coustomer')
})


router.post('/', async function(req, res) {
    try {
        var userdb = new coustomer({
            name: req.body.name,
            email: req.body.email,
            otherInfo: {
                address: req.body.address,
                gender: req.body.gender
            }
        })
        var userData = await userdb.save()
        console.log(userData);
        res.render('coustomer', { message: "Coustomer Data Insert In DB" })
    } catch (error) {
        console.log(error);
        console.log('Error During the Adding Data in DB');
        res.render('coustomer')
    }
})



router.get('/coustomerDisplay', async function(req, res) {

    try {
        var coustomerDisplay = await coustomer.find().lean()
        res.render('coustomerDisplay', { coustomerDisplay })
    } catch (err) {
        console.log(err);
    }
});

router.post('/coustomerDisplay', function(req, res) {

});

router.get('/coustomerUpdate/:id', async function(req, res) {
    try {
        var CoustomerId = await coustomer.findById(req.params.id).lean()
        console.log(CoustomerId);
        res.render('coustomerUpdate', { CoustomerId })
    } catch (err) {
        console.log(err);
    }

})

router.post('/coustomerUpdate/:id', async function(req, res) {
    try {

        var userdb = {
            name: req.body.name,
            email: req.body.email,
            otherInfo: {
                address: req.body.address,
                gender: req.body.gender
            }
        }
        let id = req.params.id;
        // console.log(id);

        await coustomer.findByIdAndUpdate(id, userdb, { upsert: true }).lean();
        console.log(userdb);

        res.redirect('/coustomer')

    } catch (error) {
        console.log(error);
        console.log('Error During the Adding Data in DB');
        res.render('coustomer')
    }
});

module.exports = router