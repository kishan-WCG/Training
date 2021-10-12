const admin = require('../../model/admin');

module.exports.getchangepassword = function(req, res, next) {
    res.render("admin/changepassword", { layout: "demo1.hbs" });
}

module.exports.postchangepassword = function(req, res, next) {

    if (req.session.uid) {

        let oldpass = req.body.password;
        admin.findOne({ _id: req.session.uid })
            .then((data) => {
                // console.log(data);
                if (oldpass != data.password) {
                    let msg1 = "Enter Your Old Password";
                    res.render("signUp", { msg1: msg1 });
                } else {
                    let newpass = req.body.newpass;
                    if (oldpass == newpass) {
                        let msg2 = "It's your current password please set new password";
                        res.render("signUp", { msg2: msg2 });
                    } else {

                        // console.log(newpass)
                        let repass = req.body.repassword;
                        if (newpass == repass) {

                            admin.findByIdAndUpdate(req.session.uid, { password: newpass })
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
    } else {
        res.render('admin/login')
    }

}