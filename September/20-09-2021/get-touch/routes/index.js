var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/mailer', function (req, res, next) {
  res.render('mailer');
});



router.post('/mailer', function (req, res, next) {
  console.log(req.body)
  var name = req.body.text1
  var email = req.body.text2
  var sub = req.body.text3
  var msg = req.body.text3



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
      to: email,  // list of receivers
      subject: sub, // Subject line
      text: "Hello world?", // plain text body
      html: `
        <h1>${name}</h1> 
        <h2>${email}</h2>
        <h3>${sub}</h3> 
        <h4>${msg}</h4>     
   `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);

  res.render('ans', {myname: name, myemail: email, mysub: sub, mymsg: msg})
});


module.exports = router;
