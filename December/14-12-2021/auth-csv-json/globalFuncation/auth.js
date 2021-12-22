const jwt = require("jsonwebtoken");

module.exports.authJWT = function(req, res, next) {
    let token = req.cookies.Token;
    const privatekey = "aihdkloihgjeosjfyrnbvsjeirnfbdks";
    jwt.verify(token, privatekey, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/login");
        } else {
            req.user = user;
            return next();
        }
    });
}