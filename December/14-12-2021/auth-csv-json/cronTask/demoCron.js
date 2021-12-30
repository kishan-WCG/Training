// Importing required libraries
const csv = require("csvtojson");
const mongoose = require('mongoose');
let fileModel = require('../model/filesModel');
let usermodel = require('../model/usersModel');
const cron = require("node-cron");
const validationGlobal = require('../globalFuncation/regularExpression');
let checkEmail = validationGlobal.checkEmail;
let checkMobile = validationGlobal.checkMobile;

mongoose.connect(
        `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.localhost}:${config.mongodb.port}/${config.mongodb.database}`)
    .then(() => { console.log(`Server Start On`) })
    .catch((error) => { console.log(error) })

module.exports = function(time) {
    cron.schedule(time, async function() {
        try {
            let file = await fileModel.findOne({ status: { $ne: "Success" }, mappingbj: { $ne: null }, });
            if (!file) {
                console.log('No File Pending...');
            } else {

                // let fileDisplay = file.name
                let fileDisplay = file.name

                //   ----       BELOW TWO LINE SOCKET.IO        ----

                // socket.emit("fileName", { fileDisplay });
                //  Using the Redis Socket.io ---------
                // console.log('Connection Done');
                publisher.publish("cronNotification", JSON.stringify({
                    message: "fileStart",
                    file: fileDisplay
                }));
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
                console.log(filterUsers)
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
                        csvDuplicateUsers: csvDuplicateUsers,
                        duplicate: duplicates,
                        invalid: inValid,
                        totalUpload: uploadedBy.length,
                        status: "Success"
                    }
                });
                console.log('DEMOCRON.JS')

                publisher.publish("cronNotification", JSON.stringify({
                    message: "fileStop",
                    file: fileDisplay

                }));
                // socket.emit("fileStop", { fileDisplay });
                // console.log(fileDisplay);
            }
        } catch (error) {
            console.log(error);
        }

    });
}