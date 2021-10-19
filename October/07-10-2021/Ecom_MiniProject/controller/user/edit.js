const user = require("../../model/user")

module.exports.getedituser = function(req, res, next) {

    // console.log('This is a Id for Edit' + req.params.id);

    user.findById(req.params.id).lean().then((data) => {
        res.render('admin/user/edit', { dbdata: data })
    }).catch((err) => {
        console.log(err);
    })

    // res.render('admin/user/display')
}

module.exports.postedituser = function(req, res, next) {

    var editd = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,

    }

    let id = req.params.id

    user.findByIdAndUpdate(id, editd).then(() => {

        res.redirect('/admin/user/display')
    }).catch((err) => {
        console.log(err);
    })

}