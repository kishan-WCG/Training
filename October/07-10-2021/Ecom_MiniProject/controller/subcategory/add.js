const category = require("../../model/category");
const subcategory = require("../../model/subcategory");

module.exports.getaddsubcategory = function(req, res, next) {
    category.find().lean().then((data)=>{
        res.render("admin/subcategory/add" , { category : data});

    }).catch((err)=>{
        next(err);
    });

    

}

module.exports.postaddsubcategory = function(req, res, next) {

    
    let addsub ={
        subcategoryname : req.body.subcategory,
        _category : req.body._category
    }

    new subcategory(addsub).save().then((data) => {
        console.log("data added");
        res.redirect('/admin/subcategory/add');
    }).catch((err) => {
        next(err);
    });

        // subcategory.create(req.body).then(() => {
        //     console.log("data added");
        // }).catch((err) => {
        //     next(err);
        // })


        // console.log(req.body);
}