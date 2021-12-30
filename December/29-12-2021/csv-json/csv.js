// THIS ONLY DEMO -----

const csv = require('csvtojson')
const csvFilePath = './public/csv/DATA.csv';
const fs = require('fs')
async function ab() {
    // const formData = new FormData();
    // formData.append('file', $('#import')[0].file[0]);

    let users = await csv().fromFile(csvFilePath);
    fs.writeFile('DATA.json', JSON.stringify(users, null, 19), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('JSON Array Saved...');
        console.log(users)


    });
    // console.log(JSON.stringify(users));
}
ab();