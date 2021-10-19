const user = require("../../model/user")

module.exports.getdeleteuser = function(req, res, next) {

    var delid = req.params.id

    user.findByIdAndDelete(delid, (err, data) => {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/user/display')
        }

    })


}