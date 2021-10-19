// const state = require("../../model/state")
const city = require('../../model/city')
const state = require('../../model/state')


module.exports.getcity = function(req, res, next) {

    state.find().lean().then((dbstate) => {
        // console.log(areapopulate);
        res.render('admin/city/add', { statedb: dbstate });
    }).catch((err) => {
        console.log(err);
    })




}

module.exports.postcity = function(req, res, next) {

    var bodycity = {
        cityname: req.body.cityname,
        _state: req.body._state
    }

    let citydata = city(bodycity)

    citydata.save((err, data) => {

        if (err) {
            console.log('dueing the eror ');
            console.log(err);
        } else {
            console.log(data);
            res.redirect('/admin/city/add')
        }
    })

}