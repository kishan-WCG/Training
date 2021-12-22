let express = require('express');
let router = express.Router();
let categoryModel = require('../model/category');
let multiCategory = require('../model/multiCateModel');
/* GET home page. */
router.get('/',async function(req, res, next) {
  let category = await categoryModel.find().lean();
  res.render('index',{category});
});

router.get('/multiCate',async function(req, res, next) {
  try {
    let category = await categoryModel.find().lean();
    let products = await multiCategory.find().populate('_category');
    console.log(products);
    res.render('multiCate.hbs',{category , products});
  }
  catch(error){
    res.render('index')
    console.log(error);
  }
});

router.post('/multiCate',async function(req, res, next) {
  try{
    let { product, category} = req.body;
    await multiCategory.create({ productName:product,_category:category})
  }
  catch(error){
    console.log(error)
  }
});
module.exports = router;
