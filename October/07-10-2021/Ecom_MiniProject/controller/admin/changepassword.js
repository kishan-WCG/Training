const admin = require('../../model/admin');

module.exports.getchangepassword = function(req, res, next) {
    res.render("admin/changepassword");
}

module.exports.postchangepassword = function(req, res, next) {


    let oldpass = req.body.password;
    admin.findOne({ email: req.session.uid })
        .then((data) => {
            console.log(data);
            if (oldpass != data.password) {
                let msg1 = "Enter Your Old Password";
                res.render("admin", { msg1: msg1 });
            } else {
                let newpass = req.body.newpassword;
                if (oldpass == newpass) {
                    let msg2 = "It's your current password please set new password";
                    res.render("admin", { msg2: msg2 });
                } else {
                    let newpass = req.body.newpassword;
                    console.log(newpass)
                    let repass = req.body.repassword;
                    if (newpass == repass) {
                        data.password = newpass;
                        data
                            .save()
                            .then(() => {
                                return res.redirect("/admin/dashboard");
                            })
                            .catch((err) => {
                                throw err;
                            });
                    } else {
                        let msg3 = "Password not match";
                        res.render("admin/dashboard", { msg3: msg3 });
                    }
                }
            }
        })
        .catch((err) => {
            throw err;
        });

}