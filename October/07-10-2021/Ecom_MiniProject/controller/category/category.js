const category = require("../../model/category");

module.exports.getcategory = function(req, res, next) {
    res.render("admin/category/add-category");

}

module.exports.postcategory = function(req, res, next) {

          
    var item = {
        categoryname: req.body.categoryname,
        
    };
 

    let data = category(item);
    data.save((error) => {

        if (error) {
            console.log('Error During the insert Record');
        } else {
            console.log('Record Insert .!');
            console.log(data);
            res.redirect('/admin/category/add-cate')
        }
    })

  

}