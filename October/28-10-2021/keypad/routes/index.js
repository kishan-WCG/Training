var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    let input = "4400";
    let Value = input.split("");
    let storevalue;
    let zero;
    let counter = 0;
    let result = [];

    var keypad = {
        1: "0",
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    }

    for (let num of Value) {
        if (storevalue == undefined) {
            storevalue = num;
            counter++;
            if (zero == num) {
                result.push(" ");
                zero = undefined;
                storevalue = undefined;
                counter = 0;
            }
        } else {
            if (storevalue == num) {
                counter++;
            } else {
                let value = keypad[storevalue].split("");
                result.push(value[counter - 1]);
                counter = 0;
                storevalue = num;
                counter++;
                if (storevalue == 0) {
                    zero = num;
                    storevalue = undefined;
                    counter = 0;
                }
            }
        }
    }
    let value = keypad[storevalue].split("");
    result.push(value[counter - 1]);
    counter = 0;
    console.log(result.join(""));
    res.render('index', { title: 'Express' });
});


module.exports = router;