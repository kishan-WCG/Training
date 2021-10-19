const area = require("../../model/area")

module.exports.geteditarea = function(req, res, next) {

    // console.log('This is a Id for Edit' + req.params.id);

    area.findById(req.params.id).lean().then((data) => {
        res.render('admin/area/edit', { dbarea: data })
    }).catch((err) => {
        console.log(err);
    })

    // res.render('admin/state/display')
}

module.exports.posteditarea = function(req, res, next) {

    var editd = {
        areaname: req.body.areaname,
    }

    let id = req.params.id

    area.findByIdAndUpdate(id, editd).then(() => {

        res.redirect('/admin/area/display')
    }).catch((err) => {
        console.log(err);
    })

}