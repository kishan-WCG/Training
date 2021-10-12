const product = require("../../model/category");

module.exports.getdeletecategory = function(req, res, next) {

    var deleteid = req.params.id;
    product.findByIdAndDelete(deleteid, function(err, data) {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/category/display')
        }

    });



}

module.exports.postdeletecategory = function(req, res, next) {

}