const category = require("../../model/category");


module.exports.geteditcategory = function(req, res, next) {

    category.findById(req.params.id).lean().then((data) => {
        console.log(data);
        res.render('admin/category/edit', { category: data })

    }).catch((err) => {
        console.log(err);
    });



}

module.exports.posteditcategory = function(req, res, next) {


    var bodycategory = {
        categoryname: req.body.categoryname

    }

    let id = req.params.id;
    category.findByIdAndUpdate(id, bodycategory).then(() => {
        res.redirect("/admin/category/display");
    }).catch(() => {
        console.log("err");
    })

}


// middleware ---isLogin.js

// function (params) {
//     if(req.session.[])
//         next();
//     res.redirect("/login");
// }