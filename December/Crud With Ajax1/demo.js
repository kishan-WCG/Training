const { parse } = require('json2csv');

const field = [{
        label: "firstName",
        value: "fName"
    }, {
        label: "lastName",
        value: "lName"
    }, {
        label: "address",
        value: "address"
    }, {
        label: "gender",
        value: "gender"
    }, {
        label: "interest",
        value: "interest"
    },

];
const opts = { field };
const fs = require("fs");
let users = [{

        "fName": "kishan",
        "lName": "limbasiya",
        "address": "address",
        "address": "male",
        "interest": "null",

    },
    {

        "fName": "ravi",
        "lName": "malaviya",
        "address": "add",
        "gender": "male",
        "interest": "area2",

    },
    {

        "fName": "zzz",
        "lName": "zzz",
        "address": "zzz",
        "gender": "female",
        "interest": "null",

    },
    {

        "fName": "a",
        "lName": "a",
        "address": "a",
        "gender": "male",
        "interest": "null",

    },


    {

        "fName": "gfddh",
        "lName": "gfdhgfdh",
        "address": "jjjj",
        "gender": "male",
        "interest": "area2",

    },


    {

        "fName": "dshgbll",
        "lName": " iopsdgfk",
        "address": "flkgpdLFkg",
        "gender": "male",
        "interest": "null",

    }
]

try {
    const csv = parse(users, opts);
    console.log(csv);
    fs.writeFileSync("users.csv", csv);
} catch (err) {
    console.error(err);
}