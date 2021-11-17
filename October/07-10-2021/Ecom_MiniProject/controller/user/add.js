// const state = require("../../model/state")
const user = require('../../model/user')
const area = require('../../model/area');
const { rawListeners } = require('../../model/user');
var bcrypt = require('bcryptjs');

module.exports.getuser = function(req, res, next) {

    area.find().lean().then((datap) => {
        // console.log(areapopulate);
        res.render('admin/user/add', { areap: datap });
    }).catch((err) => {
        console.log(err);
    })



}

module.exports.postuser = function(req, res, next) {

    var bodystate = {
        name: req.body.name,
        email: req.body.email,
        password: req.b.password,
        address: req.body.address,
        photo: req.files.photo.name,
        _area: req.body._area


    }

    let sdata = user(bodystate)
    let files = req.files.photo
    files.mv(`public/admin/images/${req.files.photo.name}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {


            sdata.save((err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Record Insert .!');

                    res.redirect('/admin/user/add')
                }
            });
        }
    });




}