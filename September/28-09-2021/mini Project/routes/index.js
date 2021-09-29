var express = require('express');
const signUp = require('../model/signUp');
const product = require('../model/product');
const { text } = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/SignUp', function(req, res, next) {
    res.render('SignUp');
});

router.post('/SignUp', function(req, res, next) {
    // var fileobj = req.files.photo;
    // console.log(photo);

    // var fileobj = req.files.img;
    // fileobj.mv('public/images/' + fileobj.name, function(err) {
    //     if (err)
    //         return res.send("File not uploaded...");

    // })

    var bodydata = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            dob: req.body.dob,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            age: req.body.age,
            phone: req.body.phone,
            skype: req.body.skype


        }
        // fileobj.mv('public/images/' + fileobj.name, function(err) {
        //     if (err)
        //         return res.send("File not uploaded...");
        // });

    console.log(bodydata)
    var data = new signUp(bodydata)

    data.save((err) => {
        if (err) {
            console.log(err)
            console.log('Error in Inset Record ')
        } else {
            console.log(' Record Added..!')
            res.redirect('/SignIn')
        }
    })


});
router.get('/SignIn', function(req, res, next) {
    res.render('SignIn')
});

router.post('/SignIn', function(req, res, next) {
    var my = req.body.email;
    req.session.semail = my;
    console.log(req.session.semail)
    res.redirect('/home')


    let email = req.body.email;
    let password = req.body.password;

    signUp.findOne({ email: email }).then((user) => {

        if (user == null) {
            return res.json("Email Or Password Invalid");
        } else {
            if (password == user.password) {
                req.session.user = email;
                res.redirect("/home");
            } else {
                res.json("Email Oe Password Invalid")
            }
        }

    }).catch((err) => {
        console.log(err);
    })





});

router.get('/home', function(req, res, next) {
    console.log(req.session.user)
    signUp.find().lean().then((data) => {

        res.render('home', { user: data });
    }).catch((err) => {
        throw err;
    });
    if (req.session.user) {

        signUp.findOne({ email: req.session.user }).lean().then((user) => {
            console.log(user)
            res.render("home", { user: user })
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.redirect('/SignIn')

    }
});

router.get('/logout', function(req, res) {

    req.session.destroy((error, data) => {
        if (error) {
            console.log('Errr in Logout')
        } else {
            console.log('Logout ..!' + data)
            res.redirect('/SignIn')
        }
    })
})

router.post('/changepassword', function(req, res) {
    if (req.session.user) {
        let oldpass = req.body.password;
        signUp.findOne({ email: req.session.user })
            .then((data) => {
                console.log(data);
                if (oldpass != data.password) {
                    let msg1 = "Enter Your Old Password";
                    res.render("SignUp", { msg1: msg1 });
                } else {
                    let newpass = req.body.newpassword;
                    if (oldpass == newpass) {
                        let msg2 = "It's your current password please set new password";
                        res.render("SignUp", { msg2: msg2 });
                    } else {
                        let newpass = req.body.newpassword;
                        console.log(newpass)
                        let repass = req.body.repassword;
                        if (newpass == repass) {
                            data.password = newpass;
                            data
                                .save()
                                .then(() => {
                                    return res.redirect("/home");
                                })
                                .catch((err) => {
                                    throw err;
                                });
                        } else {
                            let msg3 = "Password not match";
                            res.render("home", { msg3: msg3 });
                        }
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
    }
})




router.get('/mailer', function(req, res, next) {
    res.render('mailer')
});

router.post('/mailer', function(req, res, next) {
    console.log(req.body);
    var foremail = req.body.foremail;
    signUp.findOne({ email: foremail }).then((user) => {

        "use strict";
        const nodemailer = require("nodemailer");
        async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "herrypottar21@gmail.com", // generated ethereal user
                    pass: "herry123!@#", // generated ethereal password
                },
            });

            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: foremail, // list of receivers
                subject: "Forgot Password ✔", // Subject line
                text: "Hello world?", // plain text body
                html: ` <h3>Your Password Is :- </h3><h1>${user.password}</h1>`,

            });
            res.render('ans', { myname: name, myemail: email, mypass: pass, file: file, mynumber: number, mymale: male, myfemale: female })
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);

    }).catch((err) => { console.log(err); })

    res.render('SignIn')

});

router.get('/admin-panel', function(req, res) {

    res.render('admin-panel')

})

router.post('/admin-panel', function(req, res) {


    if (req.body.uname == "admin" && req.body.password == "admin") {
        req.session.name = req.body.uname;
        console.log(req.session.name)
        res.render('admin-home')
    } else {
        res.end('Please Enter correct Detilas');
    }
    // var my = req.body.uname;
    // var password = req.body.password;
    // req.session.name = my;
    // console.log(req.session.name)
    // res.render('index')
});
router.get('/admin-home', function(req, res) {

    res.render('admin-home')

})
router.post('/admin-home', function(req, res) {



})

router.get('/view-product', function(req, res) {

    product.find(function(err, data) {

        if (err) {
            console.log('Error During the View Product.....!')
            console.log(err)
        } else {
            console.log('Fetching Data ' + data);
            res.render("view-product", { viewproduct: data })
        }

    }).lean();

});


router.get('/add-product', function(req, res, next) {
    res.render('add-product');
});

router.post('/add-product', function(req, res, next) {
    // console.log(req.files)
    let a = req.body.text
    console.log('var A is a ' + a);
    var bodydatas = {
        name: req.body.name,
        price: req.body.price,
        cate: req.body.cate,
        des: req.body.des

        // proimg: req.files.proimg
    }
    console.log(bodydatas)

    var data = new product(bodydatas)

    data.save((err) => {
        if (err) {
            console.log(err)
            console.log('Error in Inset Record ')
        } else {
            console.log(' Record Added..!')
            res.redirect('/view-product')
        }
    })


});


router.get("/delete/:id", function(req, res) {

    if (req.session.name) {
        console.log(req.params.id)
        var deleteid = req.params.id;
        product.findByIdAndDelete(deleteid, function(err, data) {
            if (err) {
                console.log('Error during the Product Delete........!')
                res.send('error')
            } else {
                console.log('Product Deleted');
                res.redirect('/view-product')
            }

        })
    } else {

        res.render('admin-panel')
    }




})

router.get("/edit-product/:id", function(req, res) {

    product.findById(req.params.id).then(user => {
        res.render('edit-product', { editdata: user })
    }).catch()
});

router.post("/edit-product/:id", function(req, res) {
    const body = {
        name: req.body.name,
        price: req.body.price,
        cate: req.body.cate,
        des: req.body.des

    };
    let id = req.params.id;
    /* product.findByIdAndUpdate(id, body, function(err, data) {
         if (err) {
             console.log('Error during the Edit ......!');
         } else {
             console.log('record Added......!');
             res.redirect('/view-product');
         }

     })*/
    product.findByIdAndUpdate(id, body).then(() => {
        res.redirect("/view-product");
    }).catch(() => {
        console.log("err");
    })

})


module.exports = router;