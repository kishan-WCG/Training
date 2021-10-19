// const state = require("../../model/state")
const state = require('../../model/state')


module.exports.getstate = function(req, res, next) {

    res.render('admin/state/add')


}

module.exports.poststate = function(req, res, next) {

    var bodystate = {
        statename: req.body.statename
    }

    let sdata = state(bodystate)

    sdata.save((err, data) => {

        if (err) {
            console.log('dueing the eror ');
            console.log(err);
        } else {
            console.log(data);
            res.redirect('/admin/state/add')
        }
    })

}