var express = require('express');
const coustomer = require('../model/coustomer');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('coustomer');
});

router.post('/', async function(req, res) {
    try {
        var userdb = new coustomer({
            name: req.body.name,
            email: req.body.email,
            otherInfo: {
                address: req.body.address,
                gender: req.body.gender
            }
        });
        var userData = await userdb.save();
        console.log(userData);
        res.render('coustomer', { message: "Coustomer Data Insert In DB" });
    } catch (error) {
        console.log(error);
        res.redirect('/coustomer');
    }
})

router.get('/display', async function(req, res) {
    try {
        var coustomerDisplay = await coustomer.find().lean();
        res.render('display', { coustomerDisplay });
    } catch (err) {
        console.log(err);
        res.redirect('/coustomer');
    }
});

router.get('/update', async function(req, res) {
    try {
        var CoustomerId = await coustomer.findById(req.params.id).lean();
        console.log(CoustomerId);
        res.render('update', { CoustomerId });
    } catch (err) {
        console.log(err);
        res.redirect('/coustomer');
    }

    res.render('update')

})

router.post('/update', async function(req, res) {
    try {
        await coustomer.updateOne({ email: req.body.email, }, { $set: { name: req.body.name, email: req.body.email, 'otherInfo.address': req.body.address, 'otherInfo.gender': req.body.gender } }, { upsert: true });
        res.redirect('/coustomer');
    } catch (error) {
        console.log(error);
        res.redirect('/coustomer');
    }
});

router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    coustomer.findByIdAndDelete(id, function(err, coustomer) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/coustomer/display/');
        }
    });
});

module.exports = router