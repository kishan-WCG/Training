var express = require('express');
const signUp = require('../model/signUp');
const product = require('../model/product');
const admin = require('../model/admin');
const { text } = require('express');
const session = require('express-session');
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/SignUp', function(req, res, next) {
    res.render('SignUp');
});

router.post('/SignUp', async function(req, res, next) {

    var fileobj = req.files.photo;

    fileobj.mv('public/images/' + fileobj.name, function(err) {
        if (err)
            return res.send("File not uploaded...");

    })
    var solt = bcrypt.genSaltSync(10);
    let hash = await bcrypt.hash(req.body.password, solt)
    var bodydata = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        password: hash,
        address: req.body.address,
        city: req.body.city,
        age: req.body.age,
        phone: req.body.phone,
        skype: req.body.skype


    }

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

    let email = req.body.email;
    let password = req.body.password;

    signUp.findOne({ email: email }).then((user) => {

        if (user == null) {
            return res.json("Email Or Password Invalid");
        } else {

            var bool = bcrypt.compareSync(req.body.password, user.password)
            if (bool == false) {
                res.send('Password is Invalid')
            } else {
                req.session.user = email;
                console.log('session checker' + req.session.user);
                res.redirect("/view-only-user");
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
    var email = req.body.email;
    signUp.findOne({ email: email }).then((user) => {

        "use strict";

        async function main() {
            const nodemailer = require("nodemailer");
            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "replyfor123@gmail.com", // generated ethereal user
                    pass: "Kishan123", // generated ethereal password
                },
            });

            let info = await transporter.sendMail({
                from: '"Fred Foo ????" <foo@example.com>', // sender address
                to: email, // list of receivers
                subject: "Forgot Password ???", // Subject line
                text: "Hello world?", // plain text body
                html: ` <h3>Your Password Is :- </h3><h1>${user.password}</h1>`,

            });
            // res.render('ans', { myname: name, myemail: email, mypass: pass, file: file, mynumber: number, mymale: male, myfemale: female })
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


    let uname = req.body.uname;
    let password = req.body.password;
    // console.log(uname);
    // console.log(password);

    admin.findOne({ uname: uname }).then((data) => {
        console.log('database is ' + data);

        if (data == null) {
            return res.json("Email Or Password is Null");
        } else {
            if (password == data.password) {
                req.session.uname = data.uname;
                console.log('session checker' + req.session.uname);
                res.redirect("/admin-home");

            } else {
                res.json("Email Oe Password Invalid")
            }
        }

    }).catch((err) => { throw err })


    // if (req.body.uname == "admin" && req.body.password == "admin") {
    //     req.session.name = req.body.uname;
    //     console.log(req.session.name)
    //     res.redirect('/admin-home')
    // } else {
    //     res.end('Please Enter correct Detilas');
    // }

});
router.get('/admin-home', function(req, res) {
    // res.render('admin-home')
    if (req.session.uname) {
        product.find(function(err, data) {

            if (err) {
                console.log('Error During the View Product.....!')
                console.log(err)
            } else {
                console.log('Fetching Data ' + data);
                res.render("admin-home", { viewproduct: data })

            }

        }).lean();

    } else {
        res.redirect('/admin-panel')
    }



})
router.post('/admin-home', function(req, res) {



})

router.get('/admin-logout', function(req, res) {

    req.session.destroy((error, data) => {
        if (error) {
            console.log('Errr in Logout')
        } else {
            console.log('Logout ..!' + data)
            res.redirect('/view-product')
        }
    })
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
    if (req.session.uname) {
        res.render("add-product")
    } else {
        res.redirect('/admin-panel')
    }



});

router.post('/add-product', function(req, res, next) {


    var item = {
        name: req.body.name,
        price: req.body.price,
        cate: req.body.cate,
        des: req.body.des,
        add: req.files.add.name,
    };

    let img = req.files.add;

    let tempData = product(item);

    img.mv(`public/images/${req.files.add.name}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            tempData.save((err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.redirect("/admin-home");
                }
            });
        }
    });
});


router.get("/delete/:id", function(req, res) {


    console.log(req.params.id)
    var deleteid = req.params.id;
    product.findByIdAndDelete(deleteid, function(err, data) {
        if (err) {
            console.log('Error during the Product Delete........!')
            res.send('error')
        } else {
            console.log('Product Deleted');
            res.redirect('/admin-home')
        }

    })









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
router.get("/view-only-user", function(req, res) {
    product.find(function(err, data) {

        if (err) {
            // console.log('Error During the View Product.....!')
            console.log(err)
        } else {
            console.log('Fetching Data ' + data);
            res.render("view-only-user", { viewproduct: data })
        }

    }).lean();

});

router.get("/buy:id", function(req, res) {
    if (req.session.user) {

        signUp.findOne({ email: req.session.user }).lean().then((user) => {
            product.findById(req.params.id).lean().then((data) => {

                console.log('product is a ........' + data.name);
                res.render("buy", { user: user, viewproduct: data })
                console.log('product is a ....111111111111....' + data.name);

            })

        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.redirect('/SignIn')

    }

});



router.get('/order', function(req, res, next) {
    res.render('order')
});

router.post('/order', function(req, res, next) {
    console.log(req.body);

    signUp.findOne(email).then((user) => {
        console.log(email);
        "use strict";

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
                from: '"Fred Foo ????" <foo@example.com>', // sender address
                to: email, // list of receivers
                subject: "Forgot Password ???", // Subject line
                text: "Hello world?", // plain text body
                html: ` <h3>Your Password Is :- </h3><h1>${user.password}</h1>`,

            });
            // res.render('buy', { myname: name, myemail: email, mypass: pass, file: file, mynumber: number, mymale: male, myfemale: female })
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);

    }).catch((err) => { console.log(err); })

    res.render('error')

});

router.get('/order', function(req, res, next) {
    res.render('order')
});



module.exports = router;