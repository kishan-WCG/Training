var express = require('express');
var router = express.Router();
const demos = require('../model/demos')
const category = require('../model/category');
const subcategory = require('../model/subcategory');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var bodydata = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,

    }

    var data = new demos(bodydata);

    data.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.redirect('login')
        }
    })
});

router.get('/login', function(req, res) {


    // demos.findOne({ email: email })

    res.render('login');

})

router.post('/login', async function(req, res) {


    let email = req.body.email;
    let password = req.body.password;

    var data = await demos.findOne({ email: email })
    console.log(data);

    if (!data) {
        return res.json('Email or Password Invalid...')
    } else {

        if (password == data.password) {

            res.json('Login')
        } else {
            res.json('Email Or PAssword Are Invallid....')
        }
    }





})

router.get('/category', function(req, res) {
    res.render('category')
})

router.post('/category', async function(req, res) {

    var bodydata = {
        category: req.body.category
    }

    var data = new category(bodydata)

    var data = await data.save()
    if (!data) {
        res.json('Data is  nulll')
    } else {
        res.redirect('/category')
    }



})

router.get('/subcategory', async function(req, res) {
    let categories = await category.find().lean()
    res.render('subcategory', { categories })
})

router.post('/subcategory', async function(req, res) {

    var bodydata = {

        subcategory: req.body.subcategory,
        _category: req.body._category
    }

    var subcate_db = new subcategory(bodydata)

    var data = await subcate_db.save()
    if (!data) {
        console.log(err);
    } else {
        res.redirect('/subcategory')
    }




})

router.get('/product', async function(req, res) {

    var data = await subcategory.find()
    console.log(data);
    if (!data) {
        console.log(err);
    } else {
        res.redirect('/product', { data })
    }

    // res.render('product')
})

router.post('/product', function(req, res) {

})


module.exports = router;