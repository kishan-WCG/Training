var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
});
// Home Page Post methods
router.post('/', [check('name', 'Minimum 4 Char Required ').isLength({ min: 4 }).trim().escape(),
    check('email', 'Please Enter Valid E-mail Id').isLength({ min: 5 }).trim().escape(),
    check('number', 'Please Enter Valid Mobile Number').trim().escape().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
    check('password', 'Please Enter Valid Password').isLength({ min: 5 }).trim().escape(),
    check('pancard', 'Please Enter Valid Password').trim().escape().matches(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/),
    check('adharcard', 'Please Enter Valid Adharcard  number').trim().escape().matches(/^\d{4}\s\d{4}\s\d{4}$/),
    check('passport', 'Please Enter Valid Passport Number').trim().escape().matches(/^(?!0{3,20})[A-Z0-9]{3,8}$/),
    check('gst', 'Please Enter Valid GST Number').trim().escape().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)

], function(req, res) {
    const error = validationResult(req).array();

    if (error.length) {
        let er = {};
        for (let err of error) {
            if (er[err.param]) {
                er[err.param].push(err.msg);
            } else {
                er[err.param] = [];
                er[err.param].push(err.msg);
            }

        }

        // console.log(er);

        return res.render("index", { error: er });
    }

})

router.get('error', function(req, res) {
    signup.find()
})

router.post('error', function(req, res) {

})



module.exports = router;