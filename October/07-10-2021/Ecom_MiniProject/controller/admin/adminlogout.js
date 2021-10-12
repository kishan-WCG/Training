const admin = require('../../model/admin');

module.exports.getadminlogout = function(req, res, next) {
    req.session.destroy((error, data) => {
        if (error) {
            console.log('Errr in Logout')
        } else {
            // console.log('Logout ..!' + data)
            res.redirect('/admin/login')
        }
    })
    res.render("login", { layout: "demo1.hbs" });
}

module.exports.postadminlogout = function(req, res, next) {

}