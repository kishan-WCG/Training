const state = require("../../model/state")

module.exports.getdeletestate = function(req, res, next) {

    var delid = req.params.id

    state.findByIdAndDelete(delid, (err, data) => {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/state/display')
        }

    })


}

module.exports.postdeletestate = function(req, res, next) {

}