
// *******(WITHOUT CRON FILE IMPORT  DIffrent Chnages File )********

/*
        router.post("/user/csvimport/:fileName", async function(req, res) {
    try {
        fileName = req.params.fileName;
        let fieldMap = req.body

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


        const csvFilePath = "./public/csv/import/" + fileName;
        const jsonArray = await csv().fromFile(csvFilePath);
        console.log(jsonArray);

        totalRecords = Object.keys(jsonArray).length;

        // Check CSv File Duplicates User's
        for (const user of jsonArray) {
            let emailExist = emails.includes(user.Email);
            let mobileExist = mobiles.includes(user.Mobile);
            if (emailExist || mobileExist) {
                csvDuplicateUsers++;
                continue;
            } else {
                emails.push(user.Email);
                mobiles.push(user.Mobile);
                filterUsers.push(user);
            }
        }
        for (let userIndx = 0; userIndx < filterUsers.length; userIndx++) {
            let user = filterUsers[userIndx];

            if (user.Name && user.Email && user.Mobile && checkEmail(user.Email) && checkMobile(user.Mobile)) {
                let matchUser = await usermodel.findOne({
                    $or: [{ email: user.Email }, { mobile: user.Mobile }],
                });
                let isMatch = matchUser ? true : false;
                if (isMatch) {
                    duplicates++;
                } else {
                    validUser++;
                    let usersObj = {};
                    usersObj[fieldMap["Name"]] = user.Name;
                    usersObj[fieldMap["Email"]] = user.Email;
                    usersObj[fieldMap["Mobile"]] = user.Mobile;
                    totalUpload.push(usersObj);

                }
            } else {
                inValid++;
            }
        }
        // below  Query For Insert Record in UserModel (Record for Final Output in Field Map...)
        uploadedBy = await usermodel.insertMany(totalUpload);
        // Below Query For Insert Record (Valid and Invalid and Duplicated User Count )
        await filesModel.updateOne({ name: fileName }, {
            $set: {
                mappingbj: fieldMap,
                totalRecord: totalRecords,
                duplicate: duplicates,
                invalid: inValid,
                totalUpload: uploadedBy.length,
                status: "Success"
            }
        });
        res.json({
            type: "success",
            data: {
                csvDuplicateUsers: csvDuplicateUsers,
                totalUpload: totalUpload,
                validUser: validUser,
                inValid: inValid,
                duplicates: duplicates,
                totalRecords: totalRecords
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            type: "error",
            message: "Error in CSV Import Users.."
        });
    }
}); 
*/

// ***********(WITH CRON FILE IMPORT)*************
/*
router.post("/user/csvimport/:fileName", async function(req, res) {
    try {
        fileName = req.params.fileName;
        let fieldMap = req.body
        console.log(fieldMap);

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

        const csvFilePath = "./public/csv/import/" + fileName;
        const jsonArray = await csv({ noheader: true }).fromFile(csvFilePath);

        console.log(jsonArray);
        totalRecords = Object.keys(jsonArray).length;
        // console.log(fieldMap);

        // Check CSv File Duplicates User's
        for (const user of jsonArray) {
            console.log(user);
            let emailExist = emails.includes(user[fieldMap.email]);
            let mobileExist = mobiles.includes(user[fieldMap.mobile]);
            console.log(emailExist);
            if (emailExist || mobileExist) {
                csvDuplicateUsers++;
                continue;
            } else {
                emails.push(user[fieldMap.email]);
                mobiles.push(user[fieldMap.mobile]);
                filterUsers.push(user);
            }
        }

        for (const jsonAr of filterUsers) {
            // console.log(jsonAr);
            let name = jsonAr[fieldMap.name];
            let email = jsonAr[fieldMap.email];
            let mobile = jsonAr[fieldMap.mobile];

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
        //  aaya thi Work baki che
        console.log('csvDuplicateUsers', csvDuplicateUsers)
        console.log('totalUpload', totalUpload)
        console.log('validUser', validUser)
        console.log('inValid', inValid)

        console.log('totalRecords', totalRecords)

        // below  Query For Insert Record in UserModel (Record for Final Output in Field Map...)
        uploadedBy = await usermodel.insertMany(totalUpload);
        // Below Query For Insert Record (Valid and Invalid and Duplicated User Count )
        await filesModel.updateOne({ name: fileName }, {
            $set: {
                mappingbj: fieldMap,
                totalRecord: totalRecords,
                duplicate: duplicates,
                invalid: inValid,
                totalUpload: uploadedBy.length,
                status: "Success"
            }
        });


        res.json({
            type: "success",
            data: {
                csvDuplicateUsers: csvDuplicateUsers,
                totalUpload: totalUpload,
                validUser: validUser,
                inValid: inValid,
                duplicates: duplicates,
                totalRecords: totalRecords
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            type: "error",
            message: "Error in CSV Import Users.."
        });
    }
});



router.post("/user/csvimport/:fileName", async function(req, res) {
    try {
        fileName = req.params.fileName;
        let fieldMap = req.body
        console.log(fieldMap);

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

        const csvFilePath = "./public/csv/import/" + fileName;
        const jsonArray = await csv({ noheader: true }).fromFile(csvFilePath);

        console.log(jsonArray);
        totalRecords = Object.keys(jsonArray).length;
        // console.log(fieldMap);

        // Check CSv File Duplicates User's
        for (const user of jsonArray) {
            console.log(user);
            let emailExist = emails.includes(user[fieldMap.email]);
            let mobileExist = mobiles.includes(user[fieldMap.mobile]);
            console.log(emailExist);
            if (emailExist || mobileExist) {
                csvDuplicateUsers++;
                continue;
            } else {
                emails.push(user[fieldMap.email]);
                mobiles.push(user[fieldMap.mobile]);
                filterUsers.push(user);
            }
        }

        for (const jsonAr of filterUsers) {
            // console.log(jsonAr);
            let name = jsonAr[fieldMap.name];
            let email = jsonAr[fieldMap.email];
            let mobile = jsonAr[fieldMap.mobile];

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
        console.log('csvDuplicateUsers', csvDuplicateUsers)
        console.log('totalUpload', totalUpload)
        console.log('validUser', validUser)
        console.log('inValid', inValid)

        console.log('totalRecords', totalRecords)

        // below  Query For Insert Record in UserModel (Record for Final Output in Field Map...)
        uploadedBy = await usermodel.insertMany(totalUpload);
        // Below Query For Insert Record (Valid and Invalid and Duplicated User Count )
        await filesModel.updateOne({ name: fileName }, {
            $set: {
                mappingbj: fieldMap,
                totalRecord: totalRecords,
                duplicate: duplicates,
                invalid: inValid,
                totalUpload: uploadedBy.length,
                status: "In Progress"
            }
        });


        res.json({
            type: "success",
            data: {
                csvDuplicateUsers: csvDuplicateUsers,
                totalUpload: totalUpload,
                validUser: validUser,
                inValid: inValid,
                duplicates: duplicates,
                totalRecords: totalRecords
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            type: "error",
            message: "Error in CSV Import Users.."
        });
    }
});
*/