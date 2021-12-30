let converter = require('json-2-csv');
let fs = require('fs');
let filePath = fs.readFileSync('DATA.json');
let users = JSON.parse(filePath)
converter.json2csv(users, (err, csv) => {
    if (err) {
        console.log(err);
    }
    console.log('CSV Saved..');
    // fs.writeFileSync('users.csv', csv);
    console.log(csv)

});