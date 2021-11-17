var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    let user = ["kishan", 20, "ahem"];

    let [name, age, city] = user;

    console.log(name);
    console.log(age);
    console.log(city);

    res.send('respond with a resource');
});

module.exports = router;