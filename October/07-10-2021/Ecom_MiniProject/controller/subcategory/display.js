const subcategory = require("../../model/subcategory");

module.exports.getdisplaysubcategory = function(req, res, next) {
    console.log("in ==================== fun=======================");

    subcategory.find().lean().then((data) => {
        console.log('this is a SubCategoryData  *****************************************************************************************************' + data);
        res.render('admin/subcategory/display', { display: data })
    }).catch((err) => {
        console.log(err);
    })



}