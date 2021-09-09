const http = require("http");
const nodemailer = require("nodemailer");

http.createServer((req, res) => {}).listen(3000);
console.log("Server Run on Port 3000");
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
    from: '"herrypottar21@gmail.com 👻" <herrypottar21@gmail.com>', // sender address
    to: "limbasiyakishan66@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello Your Email is knjfkhasfdjkh", // plain text body
    html: "<b>This is Demo Email For that.....</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);