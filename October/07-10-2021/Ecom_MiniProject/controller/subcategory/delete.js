const subcategory = require("../../model/subcategory");

module.exports.getdeletesubcategory = function(req, res, next) {

    var deleteid = req.params.id;

    subcategory.findByIdAndDelete(deleteid, function(err, data) {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/subcategory/display')
        }

    })

}

module.exports.postdeletesubcategory = function(req, res, next) {



}