const admin = require('../../model/admin');


module.exports.getforgotpassword = function(req, res, next) {
    res.render("admin/forgotpassword", { layout: "demo1.hbs" });
}

module.exports.postforgotpassword = function(req, res, next) {
    var email = req.body.email;
    console.log(req.body);
    admin.findOne({ "email": email }, function(err, data) {
        console.log("Find One " + data);
        if (data) {
            var email = data.email;
            var password = data.password;
        }
        console.log("db_admin_data.email " + email);
        console.log("db_admin_data.password " + password);
        if (email == null) {
            console.log("If");
            res.end("Email not Found");
        } else if (email == email) {
            "use strict";
            const nodemailer = require("nodemailer");
            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let account = await nodemailer.createTestAccount();
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail', // true for 465, false for other ports
                    auth: {
                        user: 'test.jimita@gmail.com',
                        pass: 'TestJimita@49'
                    }
                });
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'kishanlimbasiya66@gmail.com', // sender address
                    to: email, // list of receivers
                    subject: "Forgot Password", // Subject line
                    text: "Hello your password is " + password, // plain text body
                    html: "Hello your password is " + password // html body
                };
                // send mail with defined transport object
                let info = await transporter.sendMail(mailOptions)
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                res.end("Password Sent on your Email");
            }
            main().catch(console.error);
        } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
        }
    });
}