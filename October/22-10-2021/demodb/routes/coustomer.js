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
        console.log('Error During the Adding Data in DB');
        res.render('coustomer');
    }
})

router.get('/display', async function(req, res) {
    try {
        var coustomerDisplay = await coustomer.find().lean();
        res.render('display', { coustomerDisplay });
    } catch (err) {
        console.log(err);
    }
});

router.get('/update/:id', async function(req, res) {
    try {
        var CoustomerId = await coustomer.findById(req.params.id).lean();
        console.log(CoustomerId);
        res.render('update', { CoustomerId });
    } catch (err) {
        console.log(err);
    }

})

router.post('/update/:id', async function(req, res) {
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
        await coustomer.updateOne({ email: req.body.email, }, { $set: { name: req.body.name, email: req.body.email, otherInfo.address: otherInfo.req.body.address, gender: req.body.gender } }, { upsert: true });
        await coustomer.findByIdAndUpdate(id, userdb).lean();
        console.log(userdb);
        res.redirect('/coustomer');
    } catch (error) {
        console.log(error);
        console.log('Error During the Adding Data in DB');
        res.redirect('coustomer');
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