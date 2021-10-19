const state = require("../../model/state")

module.exports.geteditstate = function(req, res, next) {

    // console.log('This is a Id for Edit' + req.params.id);

    state.findById(req.params.id).lean().then((data) => {
        res.render('admin/state/edit', { statedatadis: data })
    }).catch((err) => {
        console.log(err);
    })

    // res.render('admin/state/display')
}

module.exports.posteditstate = function(req, res, next) {

    var editd = {
        statename: req.body.statename,
    }

    let id = req.params.id

    state.findByIdAndUpdate(id, editd).then(() => {

        res.redirect('/admin/state/display')
    }).catch((err) => {
        console.log(err);
    })

}