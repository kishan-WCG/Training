const admin = require("../../model/admin");
var session = require('express-session')
const { check, validationResult } = require('express-validator');



module.exports.getLogin = function(req, res, next) {
    res.render("admin/login", { layout: "demo1.hbs" });
}

module.exports.postLogin =
    function(req, res, next) {
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

            return res.render("admin/login", { layout: "demo1.hbs", error: er });
        }

        let email = req.body.email;
        let password = req.body.password;
        // console.log('UserSide na Email and password' + req.body.email);
        // console.log('UserSide na Email and password' + req.body.password);
        admin.findOne({ email: email }).lean().then((data) => {

            if (data == null) {
                return res.json('Email or Password Invalid...')
            } else {

                if (password == data.password) {
                    req.session.uid = data._id;
                    console.log('this is a Session' + req.session._id);
                    res.redirect('/admin/dashboard')

                } else {
                    res.json('Email Or PAssword Are Invallid....')
                }
            }

        }).catch((error) => {
            throw error
        })


    }