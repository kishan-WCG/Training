const city = require("../../model/city")

module.exports.getdisplaycity = function(req, res, next) {

    city.find({}).lean()
        .populate('_state')
        .exec(function(err, dbstate) {
            console.log(dbstate);
            res.render("admin/city/display", { statedb: dbstate });
        })



    // city.find().lean().then((data) => {

    //     console.log(data);
    //     res.render('admin/city/display', { dbcity: data })


    // }).catch((err) => {
    //     console.log(err);
    // })


}

module.exports.postdisplaycity = function(req, res, next) {

}