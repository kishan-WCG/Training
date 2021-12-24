// Importing required libraries
const csv = require("csvtojson");
const mongoose = require('mongoose');
let fileModel = require('../model/filesModel');
let usermodel = require('../model/usersModel');
const cron = require("node-cron");

let isActive = true
mongoose.connect('mongodb://admin:admin@localhost:27017/Auth')
    .then(() => { console.log(`Server Start On`) })
    .catch((error) => { console.log(error) })

// Email Validation ( In Csv Import )
checkEmail = function(email) {
    let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
};

// Mobile Validation ( In Csv Import )
checkMobile = function(mobile) {
    let validRegex = /^[0-9]{10}$/;
    return mobile.match(validRegex);
};

isActive = false

// Creating a cron job which runs on every 10 second



module.exports = function(time) {
    cron.schedule(time, async function() {
        try {

            let file = await fileModel.findOne({ status: { $ne: "Success" } });


            if (!file) {
                console.log('No File Pending...');
            } else {

                // let fileDisplay = file.name
                let fileDisplay = file.name
                socket.emit("fileName", { fileDisplay });
                console.log(fileDisplay);

                let fileName = file.filePath;
                let fName = file.name;
                let fieldMap = file.mappingbj;

                // below Five global var used( User Count and Check Valid and Invalid User's.. );
                let totalUpload = [];
                let duplicates = 0;
                let totalRecords = 0;
                let validUser = 0;
                let inValid = 0;

                // below Three global var used( Duplicated User Check form CSV File );
                let emails = [];
                let mobiles = [];
                let filterUsers = [];
                let csvDuplicateUsers = 0;

                // const csvFilePath = fileName;
                const jsonArray = await csv({ noheader: true }).fromFile(fileName);

                totalRecords = Object.keys(jsonArray).length;

                // Check CSv File Duplicates User's
                for (const user of jsonArray) {

                    let emailExist = emails.includes(user[fieldMap.email]);
                    let mobileExist = mobiles.includes(user[fieldMap.mobile]);

                    if (emailExist || mobileExist) {
                        csvDuplicateUsers++;
                        continue;
                    } else {
                        emails.push(user[fieldMap.email]);
                        mobiles.push(user[fieldMap.mobile]);
                        filterUsers.push(user);
                    }
                }
                // Field Map 
                for (const jsonAr of filterUsers) {
                    let name = jsonAr[fieldMap.name];
                    let email = jsonAr[fieldMap.email];
                    let mobile = jsonAr[fieldMap.mobile];
                    // Below Query For Insert Record (Valid and Invalid and Duplicated User Count )
                    if (name && email && checkEmail(email) && checkMobile(mobile)) {
                        let matchUser = await usermodel.findOne({
                            $or: [{ email: email }, { mobile: mobile }],
                        });
                        let isMatch = matchUser ? true : false;
                        if (isMatch) {
                            duplicates++;
                        } else {
                            validUser++;
                            let usersObj = {};
                            for (const field in fieldMap) {
                                usersObj[field] = jsonAr[fieldMap[field]];
                            }
                            totalUpload.push(usersObj);
                        }
                    } else {
                        inValid++;
                    }
                }

                // Below  Query For Insert Record in UserModel (Record for Final Output in Field Map...)
                uploadedBy = await usermodel.insertMany(totalUpload);

                //  Update Query (CSV Data to Store FileModel)
                await fileModel.updateOne({ name: fName }, {
                    $set: {
                        mappingbj: fieldMap,
                        totalRecord: totalRecords,
                        duplicate: duplicates,
                        invalid: inValid,
                        totalUpload: uploadedBy.length,
                        status: "Success"
                    }
                });
                socket.emit("fileStop", { fileDisplay });
                console.log(fileDisplay);
            }
        } catch (error) {
            console.log(error);
        }

    });
}