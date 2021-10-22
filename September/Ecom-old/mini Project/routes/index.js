var express = require('express');
const signUp = require('../model/signUp');
const product = require('../model/product');
const admin = require('../model/admin');
const { text } = require('express');
const session = require('express-session');
const nodemailer = require("nodemailer");
const category = require('../model/category');
const order = require('../model/order');
const { BandwidthLimitExceeded } = require('http-errors');
// const nodemailer = require("nodemailer");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/SignUp', function(req, res, next) {
    res.render('SignUp');
});

router.post('/SignUp', function(req, res, next) {
    var fileobj = req.files.photo;

    fileobj.mv('public/images/' + fileobj.name, function(err) {
        if (err)
            return res.send("File not uploaded...");

    })

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
        skype: req.body.skype,
        photo: fileobj.name


    }

    console.log(bodydata)
    var data = new signUp(bodydata)

    order.create({ user_ref: req.session.uid, products_ref: [] }).then(() => {
        data.save((err) => {
            if (err) {
                console.log(err)
                console.log('Error in Inset Record ')
            } else {
                console.log(' Record Added..!')
                res.redirect('/SignIn')
            }
        })

    }).catch(err => next(err))

    // data.save((err) => {
    //     if (err) {
    //         console.log(err)
    //         console.log('Error in Inset Record ')
    //     } else {
    //         console.log(' Record Added..!')
    //         res.redirect('/SignIn')
    //     }
    // })


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
            if (password == user.password) {
                req.session.user = email;
                req.session.uid = user._id;

                order.create({ user_ref: user._id, products_ref: [] }).then(() => {
                    res.redirect("/view-only-user");
                }).catch(err => next(err))

                console.log('session checker' + req.session.user);


            } else {
                res.json("Email Oe Password Invalid")
            }
        }

    }).catch((err) => {
        console.log(err);
    })





});

router.get('/home', function(req, res, next) {
    if (req.session.user) {

        signUp.findOne({ email: req.session.user }).lean().then((user) => {
            // console.log(user)
            res.render("home", { user: user })
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.redirect('/SignIn')

    }
});

router.post('/home', function(req, res) {

})

router.get('/logout', function(req, res) {

    req.session.destroy((error, data) => {
        if (error) {
            console.log('Errr in Logout')
        } else {
            // console.log('Logout ..!' + data)
            res.redirect('/')
        }
    })
})

router.post('/changepassword', function(req, res) {
    if (req.session.user) {
        let oldpass = req.body.password;
        signUp.findOne({ email: req.session.user })
            .then((data) => {
                // console.log(data);
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
                        // console.log(newpass)
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
    // console.log('aaa email che '+ email)
    signUp.findOne({ email: email }).then((user) => {
        console.log('this is a Mailer Email fetch form the DB ' + user.email);

        "use strict";
        const nodemailer = require("nodemailer");

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "herrypottar21@gmail.com", // generated ethereal user
                    pass: "herry123!@#", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: user.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: ` <h3>Your Password Is :- </h3><h1>${user.password}</h1>`,
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
        // "use strict";

        // async function main() {
        //     const nodemailer = require("nodemailer");
        //     let testAccount = await nodemailer.createTestAccount();

        //     let transporter = nodemailer.createTransport({
        //         host: "smtp.gmail.com",
        //         port: 587,
        //         secure: false, // true for 465, false for other ports
        //         auth: {
        //             user: "replyfor123@gmail.com", // generated ethereal user
        //             pass: "Kishan123", // generated ethereal password
        //         },
        //     });

        //     let info = await transporter.sendMail({
        //         from: '"Fred Foo 👻" <foo@example.com>', // sender address
        //         to: email, // list of receivers
        //         subject: "Forgot Password ✔", // Subject line
        //         text: "Hello world?", // plain text body
        //         html: ` <h3>Your Password Is :- </h3><h1>${user.password}</h1>`,

        //     });
        //     // res.render('ans', { myname: name, myemail: email, mypass: pass, file: file, mynumber: number, mymale: male, myfemale: female })
        //     console.log("Message sent: %s", info.messageId);
        //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // }

        // main().catch(console.error);

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
                console.log('session checker - admin-panel' + req.session.uname);
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
        product.find().populate("cate").lean().then((data) => {
            res.render("admin-home", { viewproduct: data })
        }).catch((err) => {
            next(err)
        })
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

    console.log(req.session.user);
    product.find(function(err, data) {

        if (err) {
            // console.log('Error During the View Product.....!')
            console.log(err)
        } else {
            console.log('Fetching Data ' + data);
            res.render("view-product", { viewproduct: data })
        }

    }).lean();


});

router.get('/add-cate', function(req, res) {
    res.render('add-cate')

});

router.post('/add-cate', function(req, res) {
    let category_name = req.body.category
    category.create({ category_name }).then(() => {
        res.redirect("/add-cate")
    }).catch((err) => {
        next(err)
    })

});


router.get('/add-product', function(req, res, next) {
    console.log('this is a add-product session      ' + req.session.uname)
    if (req.session.uname) {
        category.find().lean().then((categories) => {
            res.render("add-product", { categories })
        }).catch((err) => {
            console.log(err);
        })

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
            // console.log('Error during the Product Delete........!')
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
        res.redirect("/admin-home");
    }).catch(() => {
        console.log("err");
    })

})
router.get("/view-only-user", function(req, res) {
    if (req.session.user) {
        product.find(function(err, data) {



            if (err) {
                // console.log('Error During the View Product.....!')
                console.log(err)
            } else {

                console.log('Fetching Data ' + data);
                category.find().lean().then((categories) => {
                    res.render("view-only-user", { viewproduct: data, categories })
                }).catch((err) => {
                    next(err)
                })

            }

        }).populate("cate").lean();

    } else {
        res.redirect('/SignIn')
    }

});

router.get("/buy/:id", function(req, res) {
    console.log('buy sesion is a the ' + req.session.user);
    if (req.session.user) {

        signUp.findOne({ email: req.session.user }).lean().then((user) => {
            product.findById(req.params.id).lean().then((data) => {

                // console.log(data.name);
                res.render("buy", { user: user, viewproduct: data })
                    // console.log(data.name);

            })

        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.redirect('/SignIn')

    }

});



router.get('/order', function(req, res, next) {
    console.log('this is a ORDER Session ' + req.session.user);
    console.log('this is NAME NAME NAME NAME NAME NAME  ' + req.session.user.name);
    if (req.session.user) {


        product.findOne({ email: req.session.user }).then((data) => {

            signUp.findOne({ email: req.session.user }).then((signup) => {


                // console.log('this is a Current E-mail fetch form the DB ' + data);
                // console.log('Sesion .....!' + data.name);
                // let ab = data.name;
                // let pri = data.;
                // let ab = data.name;
                // let ab = data.name;
                // console.log("ab is the" + ab);
                console.log(data);
                console.log(signup);
                console.log(signup.name);
                email = req.session.user;
                // console.log('This is a Final Sesion' + email);
                // console.log('This is a Final Sesion' + email);

                "use strict";
                const nodemailer = require("nodemailer");

                // async..await is not allowed in global scope, must use a wrapper
                async function main() {
                    // Generate test SMTP service account from ethereal.email
                    // Only needed if you don't have a real mail account for testing
                    let testAccount = await nodemailer.createTestAccount();

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "herrypottar21@gmail.com", // generated ethereal user
                            pass: "herry123!@#", // generated ethereal password
                        },
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"Fred Foo 👻" <foo@example.com>', // sender address
                        to: email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        text: "Hello world?", // plain text body
                        html: ` <h3>Thank You For Shooping With Us</h1>

                    <html>
                            <title>Web Page Design</title>
                    <head>
                            <style type="text/css">
                            #diva{
                                    border:1px solid black;
                                    padding: 30px;
                                 }
                            </style>
                    </head>
                    <body>
                    <div>
                    <div id="diva"> 
                        <h1 style="color:#FFB319;">Hello Dear ${signup.name}</h1> 
                        <h5>
    
                        
                        Order Number: 6419239612 ${data._id}    <br> <br>
                        Product/Service: ${data.name}   <br> <br>
                        First Payment Amount: ${data.price}       <br> <br>
                        Product Category :  ${data.cate}  <br> <br>
                        Total Amount : ${data.price} <br> <br>
                        You will receive an email from us shortly once your account has been setup. Please quote your order reference number if you wish to contact us about this order.
                        Best Regards,
                        Ecom Web...</h5>
                        
                        </div>
                        
                        
                        </div>
                        
                        </body>
                        </html>
                        We have received your order and will be processing it shortly. The details of the order are below: <br> <br>
                    
                    `,
                    });

                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                }

                main().catch(console.error);

                res.redirect('/view-only-user')



            }).catch((err) => { throw err })



        }).catch((err) => { console.log(err); })

    } else {
        res.redirect('/SignIn')
    }




});

router.post('/order', function(req, res, next) {

    res.redirect('/')

});



router.get('/category/:category_name', function(req, res, next) {

    category.find().lean().then((categories) => {
        category.findOne({ category_name: req.params.category_name }).then((category) => {
            product.find({ cate: category._id }).lean().then((data) => {
                res.render("view-only-user", { viewproduct: data, categories })
            }).catch(err => next(err))
        }).catch(err => next(err))
    }).catch(err => next(err))


})

router.get('/view-all-user', function(req, res) {


    signUp.find().lean().then((data) => {
        // console.log(data);
        res.render('view-all-user', { data })
            // console.log(data);
    }).catch(() => {
        console.log('error')
    })




});

router.get("/deleteuser/:id", (req, res, next) => {
    let userid = req.params.id;
    signUp.findByIdAndDelete(userid).then(() => {
        res.redirect("/view-all-user")
    }).catch((err) => {
        next(err)
    })
})

router.get('/view-cart', function(req, res) {
    console.log('This is a Add-cart Sessiom Checker ' + req.session.uid);
    order.findOne({ user_ref: req.session.uid }).populate("products_ref").lean().then((products) => {
        // console.log("Products ==> " + products);
        // console.log('PHOTOSSSS' + products.products_ref[0].photo);
        const qmap = new Map()
        for (let i = 0; i < products.products_ref.length; i++) {
            if (qmap.has(products.products_ref[i]._id)) {
                qmap.set(products.products_ref[i]._id, qmap.get(products.products_ref[i]._id) + 1);
            } else {
                qmap.set(products.products_ref[i]._id, 1);

            }
        }
        console.log(qmap);
        let amount = 0;
        for (let i = 0; i < products.products_ref.length; i++) {
            amount += Number(products.products_ref[i].price);
        }

        res.render("add-cart", { products_data: products.products_ref, amount: amount });
    })

});
router.get('/add-cart/:id', function(req, res) {
    console.log('This is a Add-cart Sessiom Checker ' + req.session.uid);


    order.findOne({ user_ref: req.session.uid }).then((order_data) => {
        console.log('this is a ORDER DATA FOR REFRANCE' + order_data);
        // console.log(typeof order_data.products_ref);
        // console.log(req);
        let temp_arr = order_data.products_ref
        temp_arr.push(req.params.id);


        order.findOneAndUpdate({ user_ref: req.session.uid }, { products_ref: temp_arr })

        .then((data) => {
            console.log("cart" + data);
            res.redirect("/view-only-user");
        }).catch((err) => {
            throw err;
        });

    }).catch((err) => {
        throw err;
    });

});

router.get('/user/delete-cart/:id', function(req, res) {

    let p_id = req.params.id;
    order.updateOne({ user_ref: req.session.uid }, { $pullAll: { products_ref: [p_id] } }).then(() => {
        res.redirect("/view-cart");
    }).catch((err) => {
        console.log(err);
    })
});



module.exports = router;