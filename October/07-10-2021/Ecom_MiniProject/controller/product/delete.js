const product = require("../../model/product");

module.exports.getdeleteproduct = function(req, res, next) {

    var deleteid = req.params.id;
    product.findByIdAndDelete(deleteid, function(err, data) {

        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/product/display')
        }

    });

}

module.exports.postdeleteproduct = function(req, res, next) {

}