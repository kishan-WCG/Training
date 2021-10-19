const product = require("../../model/product")
const category = require("../../model/category")

module.exports.getprodisplay = function(req, res, next) {



    product.find({}).lean()
        .populate('_subcategory')
        .exec(function(err, db_product_array) {
            console.log(db_product_array);
            res.render("admin/product/display", { product: db_product_array });
        })


    // product.find().populate({
    //     path: '_subcategory',
    //     populate: {
    //         path: '_category',
    //     }
    // }).lean().then((data) => {
    //     console.log(data);
    //     res.render('admin/product/display', { product: data })
    //     // console.log('This ia aaaaaaaaaaaaaaaaaaaa SUBCATEGORY' + _sabcategory);
    //     // console.log('This ia ccccccccccccccccccccc  CATEGORY' + _category);
    //     // console.log('Product Data is' + data);
    // }).catch((err) => {
    //     console.log(err);
    // });



}

module.exports.postprodisplay = function(req, res, next) {



}