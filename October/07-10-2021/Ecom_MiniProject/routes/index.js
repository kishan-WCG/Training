var express = require('express');
var router = express.Router();
var session = require('express-session');
const { getLogin, postLogin } = require('../controller/admin/login');
const { getSignUp, postSignUp } = require('../controller/admin/signUp');
const { getchangepassword, postchangepassword } = require('../controller/admin/changepassword');
const { getdashboard, postdashboard } = require('../controller/admin/dashboard');
const { getforgotpassword, postforgotpassword } = require('../controller/admin/forgotpassword');
const { getcategory, postcategory } = require('../controller/category/category');
const { getadminlogout, postadminlogout } = require('../controller/admin/adminlogout');
const { getaddsubcategory, postaddsubcategory } = require('../controller/subcategory/add');
const { getaddproduct, postaddproduct } = require('../controller/product/add');
const { getprodisplay, postprodisplay } = require('../controller/product/display');
const { geteditproduct, postditproduct } = require('../controller/product/edit');
const { getdeleteproduct, postdeleteproduct } = require('../controller/product/delete');
const { getdisplaycategory, postdisplaycategory } = require('../controller/category/display');
const { getdeletecategory, postdeletecategory } = require('../controller/category/delete');
const { geteditcategory, posteditcategory } = require('../controller/category/edit');
const { getdisplaysubcategory } = require('../controller/subcategory/display');
const { geteditsubcategory, posteditsubcategory } = require('../controller/subcategory/edit');
const { getdeletesubcategory, postdeletesubcategory } = require('../controller/subcategory/delete');
const islogin = require('../controller/middlewere/islogin')



router.get('/dashboard', function(req, res, next) {

    res.render('index');


});

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/signUp', getSignUp);
router.post('/signup', postSignUp);

router.get('/changepassword', islogin, getchangepassword);
router.post('/changepassword', islogin, postchangepassword);

router.get('/forgotpassword', getforgotpassword);
router.post('/forgotpassword', postforgotpassword);

router.get('/category/add-cate', islogin, getcategory);
router.post('/category/add-cate', islogin, postcategory);

router.get('/adminlogout', getadminlogout);
router.post('/adminlogout', postadminlogout);

router.get('/subcategory/add', islogin, getaddsubcategory);
router.post('/subcategory/add', islogin, postaddsubcategory);

router.get('/product/add', islogin, getaddproduct);
router.post('/product/add', islogin, postaddproduct);

router.get('/product/display', islogin, getprodisplay);
router.post('/product/display', islogin, postprodisplay);

router.get('/product/edit/:id', islogin, geteditproduct);
router.post('/product/edit/:id', islogin, postditproduct);

router.get('/product/delete/:id', islogin, getdeleteproduct);
router.post('/product/delete/:id', islogin, postdeleteproduct);

router.get('/category/display', islogin, getdisplaycategory);
router.post('/category/display', islogin, postdisplaycategory);

router.get('/category/delete/:id', islogin, getdeletecategory);
router.post('/category/delete/:id', islogin, postdeletecategory);

router.get('/category/edit/:id', islogin, geteditcategory);
router.post('/category/edit/:id', islogin, posteditcategory);

router.get('/subcategory/display', islogin, getdisplaysubcategory);


router.get('/subcategory/edit/:id', islogin, geteditsubcategory);
router.post('/subcategory/edit/:id', islogin, posteditsubcategory);

router.get('/subcategory/delete/:id', islogin, getdeletesubcategory);
router.post('/subcategory/delete/:id', islogin, postdeletesubcategory);







// router.get('/subcategory/display', getdissubcategory);
// router.post('/subcategory/display', postdissubcategory);
// router.post('/users', Alogin_Controller.create);


module.exports = router;