var express = require('express');
var router = express.Router();
const User = require('../model/user');
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
    // res.json('ljsabbdfjbjsdabfjbffdsgfjsgaf')
});

/**
 *   
 */
router.post('/login', [check('email', 'Email-id is Required').not().isEmpty(),
    check('password', 'Password is Required').not().isEmpty()
], function(req, res, next) {

    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);

    User.findOne({ email: email }).then((data) => {
        console.log(data);
        if (data) {
            return res.json('Email or Password Invalid...')
        } else {

            if (password == data.password) {
                // req.session.uid = data._id;
                // console.log('this is a Session' + req.session._id);
                res.json('Login.....')

            } else {
                res.json('Email Or PAssword Are Invallid....')
            }
        }

    }).catch((error) => {
        throw error
    })
});



router.get('/user', function(req, res, next) {
    User.find()
        .then(users => {
            res.json(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of users."
            });
        });
});

router.post('/user', [check('name', 'Minimum 4 Char Required ').isLength({ min: 3 }).trim().escape(),
    check('email', 'Please Enter Valid E-mail Id').custom((email) => {
        let user = User.findOne({ email })
        if (user) {
            throw new Error('Email is Already Try With New Email Id')

        }
        return true
    }),
    check('number', 'Please Enter Valid Mobile Number').trim().escape().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
    check('password', 'Please Enter Valid Password').isLength({ min: 5 }).trim().escape(),

], function(req, res, next) {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password
    });
    const error = validationResult(req).array();
    if (error.length) {
        res.json(error);
    } else {
        user.save()
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something went wrong while creating new user."
                });
            });
    }
});

router.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.json(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Error getting user with id " + req.params.id
            });
        });
});

router.put('/user/:id', [check('name', 'Minimum 4 Char Required ').isLength({ min: 3 }).trim().escape(),
    check('email', 'Please Enter Valid E-mail Id').isLength({ min: 5 }).trim().escape(),
    check('number', 'Please Enter Valid Mobile Number').trim().escape().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
    check('password', 'Please Enter Valid Password').isLength({ min: 5 }).trim().escape(),
], function(req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            message: "Please fill all required field"
        });
    }
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            res.json(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.id
            });
        });
});

router.delete('/user', function(req, res, next) {

    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            res.json({ message: "user deleted successfully!" });
        })
});






module.exports = router;