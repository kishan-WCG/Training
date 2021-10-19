const city = require("../../model/city")

module.exports.getdeletecity = function(req, res, next) {

    id = req.params.id

    city.findByIdAndDelete(id, (err, data) => {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/city/display')
        }

    })

}