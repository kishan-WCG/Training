module.exports.getdashboard = function(req, res, next) {
    if (req.session.uid) {
        res.render("admin/login");
    } else {
        res.render('admin/login')
    }

}

module.exports.postdashboard = function(req, res, next) {

}