const { Parser } = require('json2csv');

const fields = [{
    label: "firstName",
    value: "fName"
}, {
    label: "lastName",
    value: "lName"
}];


let users = [{
        "fName": "kishan",
        "lName": "limbasiya",
    },
    {
        "fName": "ravi",
        "lName": "malaviya",
    }
]
const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(users);

console.log(csv);