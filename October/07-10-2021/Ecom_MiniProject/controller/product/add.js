const category = require("../../model/category");
const subcategory = require("../../model/subcategory");
const product = require("../../model/product");

module.exports.getaddproduct = function(req, res, next) {


    subcategory.find().lean().then((data) => {

        console.log(' This is a SubCategory GETADDPRODUCT' + data);

        res.render('admin/product/add', { subcategory: data });

    }).catch((err) => {
        console.log(err)
        console.log('Error During the Populate Product-subcategory');
    })


}

module.exports.postaddproduct = function(req, res, next) {
    console.log(req.files);

    var bodyproduct = {
        productname: req.body.productname,
        productdetails: req.body.productdetails,
        productprice: req.body.productprice,
        _subcategory: req.body._subcategory,
        img: req.files.img.name


    }
    let img = req.files.img;

    var data = new product(bodyproduct)

    img.mv(`public/admin/images/${req.files.img.name}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            data.save((err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Record Insert .!');
                    console.log(data);
                    res.redirect('/admin/product/add')
                }
            });
        }
    });






}