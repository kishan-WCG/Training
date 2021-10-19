const city = require("../../model/city")

module.exports.geteditcity = function(req, res, next) {

    // console.log('This is a Id for Edit' + req.params.id);

    city.findById(req.params.id).lean().then((data) => {
        res.render('admin/city/edit', { dbcity: data })
    }).catch((err) => {
        console.log(err);
    })

    // res.render('admin/state/display')
}

module.exports.posteditcity = function(req, res, next) {

    var editd = {
        cityname: req.body.cityname,
    }

    let id = req.params.id

    city.findByIdAndUpdate(id, editd).then(() => {

        res.redirect('/admin/city/display')
    }).catch((err) => {
        console.log(err);
    })

}