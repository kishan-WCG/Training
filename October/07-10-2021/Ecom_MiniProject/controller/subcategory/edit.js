const subcategory = require("../../model/subcategory");

module.exports.geteditsubcategory = function(req, res, next) {

    subcategory.findById(req.params.id).lean().then((data) => {
        res.render('admin/subcategory/edit', { editdata: data })
    }).catch((err) => {
        console.log(err);
    })

}

module.exports.posteditsubcategory = function(req, res, next) {


    var bodyproduct = {
        subcategory: req.body.subcategory

    }

    let id = req.params.id;
    product.findByIdAndUpdate(id, bodyproduct).then(() => {
        res.redirect("/admin/subcategory/display");
    }).catch(() => {
        console.log("err");
    })

}