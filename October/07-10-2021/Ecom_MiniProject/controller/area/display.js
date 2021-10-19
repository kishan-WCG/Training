const area = require("../../model/area")

module.exports.getdisplayarea = function(req, res, next) {

    area.find().lean().populate('_city').then((data) => {
        console.log(data);
        res.render('admin/area/display', { citya: data })
    }).catch((err) => { console.log(err); })

    // area.find().lean().then((data) => {

    //     console.log(data);
    //     res.render('admin/area/display', { dbarea: data })


    // }).catch((err) => {
    //     console.log(err);
    // })
    // res.render('admin/area/display')

}
module.exports.postdisplayarea = function(req, res, next) {

}