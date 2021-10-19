const state = require("../../model/state")

module.exports.getdisplaystate = function(req, res, next) {

    state.find().lean().then((data) => {

        console.log(data);
        res.render('admin/state/display', { dbdata: data })


    }).catch((err) => {
        console.log(err);
    })


}

module.exports.postdisplaystate = function(req, res, next) {

}