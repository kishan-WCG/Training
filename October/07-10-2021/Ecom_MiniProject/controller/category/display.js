const category = require("../../model/category");
const product = require("../../model/category")

module.exports.getdisplaycategory = function(req, res, next) {

    category.find().lean().then((data) => {
        console.log(data);
        res.render('admin/category/display', { category: data })
        console.log('Product Data is' + data);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.postdisplaycategory = function(req, res, next) {



}