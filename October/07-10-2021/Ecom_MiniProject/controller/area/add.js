// const state = require("../../model/state")
const area = require('../../model/area')
const city = require('../../model/city')


module.exports.getarea = function(req, res, next) {

    city.find().lean().then((city) => {
        console.log(city);
        res.render('admin/area/add', { cityp: city });
    }).catch((err) => {
        console.log(err);
    })







}

module.exports.postarea = function(req, res, next) {

    var bodyarea = {
        areaname: req.body.areaname,
        _city: req.body._city
    }

    let areadata = area(bodyarea)

    areadata.save((err, data) => {

        if (err) {
            console.log('dueing the eror ');
            console.log(err);
        } else {
            console.log(data);
            res.redirect('/admin/area/add')
        }
    })

}