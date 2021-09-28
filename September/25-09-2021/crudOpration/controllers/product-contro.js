const product = require("../bin/model/product");

// Get All Product :
exports.product_all = function(req, res){
      

        const products = product.find().lean().then((products)=>{
            console.log(products);
            res.render("products", {products : products});
        }).catch( (error)=>{
        res.json({message : Error});
        console.log(error);

    });
};
// Get One Product :
const product_one = async function(req, res){};
// Add New Product :
exports.add_product = async function(req, res){
    let title = req.body.title;
    let new_product = new product({title : title});
    await new_product.save()
    res.redirect("/products")
};
// Get Update Product :
const update_product = async (req, res) =>{};
// Get Delete Product :
const delete_product_all = async (req, res) =>{};