const area = require("../../model/area")

module.exports.getdeletearea = function(req, res, next) {

    id = req.params.id

    area.findByIdAndDelete(id, (err, data) => {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/area/display')
        }

    })

}