const product = require("../../model/product")

module.exports.geteditproduct = function(req, res, next) {
    console.log('this is a edit id' + req.params.id);
    product.findById(req.params.id).lean().then((data) => {
        res.render('admin/product/edit', { editdata: data })
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.postditproduct = function(req, res, next) {

    var bodyproduct = {
        productname: req.body.productname,
        productdetails: req.body.productdetails,
        productprice: req.body.productprice,
    }

    let id = req.params.id;
    product.findByIdAndUpdate(id, bodyproduct).then(() => {
        res.redirect("/admin/product/display");
    }).catch(() => {
        console.log("err");
    })


}