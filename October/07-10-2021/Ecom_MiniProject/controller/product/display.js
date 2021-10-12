const product = require("../../model/product")

module.exports.getprodisplay = function(req, res, next) {

    product.find().lean().then((data) => {
        console.log(data);
        res.render('admin/product/display', { product: data })
        console.log('Product Data is' + data);
    }).catch((err) => {
        console.log(err);
    });



}

module.exports.postprodisplay = function(req, res, next) {



}