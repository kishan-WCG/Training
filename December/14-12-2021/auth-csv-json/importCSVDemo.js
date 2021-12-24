const csvFilePath = './public/csv/Users-2021-12-15 01:06.csv'
const csv = require('csvtojson')

async function ab() {
    const formData = new FormData();
    formData.append('file', $('#import')[0].file[0]);

    let users = await csv().fromFile(csvFilePath);
    console.log(users)
}
ab();