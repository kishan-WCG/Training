const user = require("../../model/user")

module.exports.getdisplayuser = function(req, res, next) {

    user.find({}).lean()
        .populate('_area')
        .exec(function(err, userdis) {
            console.log(userdis);
            res.render("admin/user/display", { user: userdis });
        })



    // user.find().lean().then((data) => {

    //     console.log(data);
    //     res.render('admin/user/display', { dbdata: data })


    // }).catch((err) => {
    //     console.log(err);
    // })


}

module.exports.postdisplayuser = function(req, res, next) {

}