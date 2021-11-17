var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {

    var arry = [1, 0, 0]
    var id = Number(req.params.id);
    var numbers = arry.join("")
    num = Number(numbers)
    num += id;

    var arrLenght = 0;

    num = num.toString();
    num = num.split("");

    for (let value of num) {
        let array = Number(value);
        num[arrLenght] = array;
        arrLenght++;
    }
    console.log(num);

    res.render('index', { title: 'Express' });
});

module.exports = router;