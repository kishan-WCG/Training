var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var num = [2, 2, 7, 1]
    var store = {}

    for (let i = 0; i < num.length; i++) {

        if (store[num[i]]) {
            store[num[i]] = store[num[i]] + 1

        } else {
            store[num[i]] = 1
        }

    }



    for (const index of Object.keys(store)) {

        if (store[index] == 1) {
            console.log(index);
        } else {
            console.log('String Not Match');
        }

    }

    console.log(store);
    res.render('index', { title: 'Express' });
});

module.exports = router;