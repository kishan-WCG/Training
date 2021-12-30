var cron = require('node-cron');
const nodemailer = require("nodemailer");

cron.schedule("*/30 * * * * *", () => {
    console.log('running a task ten minute');

    "use strict";
    async function main() {

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'ravi.malaviya.3795@gmail.com', // generated ethereal user
                pass: 'ravi@3795', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Cron Email every 10 min ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Cron Run Every 10 min</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
});