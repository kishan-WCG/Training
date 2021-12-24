const express = require("express");
const router = express.Router();
const usermodel = require("../model/usersModel");
const filesModel = require("../model/filesModel");
const fieldsModel = require("../model/newfield");
const jwt = require("jsonwebtoken");
const { check, validationResult, Result } = require("express-validator");
const usersModel = require("../model/usersModel");
const { Parser } = require("json2csv");
const moment = require("moment");
const fs = require("fs");
const multer = require("multer");
const csv = require("csvtojson");

// Email Validation ( In Csv Import )
// function checkEmail(email) {
//     let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     return email.match(validRegex);
// }

// Mobile Validation ( In Csv Import )
// function checkMobile(mobile) {
//     let validRegex = /^[0-9]{10}$/;
//     return mobile.match(validRegex);
// }

// Multer File Upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/csv/import");
    },
    filename: function(req, file, cb) {
        try {
            const uniqueSuffix = Date.now();
            cb(null, file.fieldname + "-" + uniqueSuffix + ".csv");
            // cb(null, file const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        } catch (error) {
            console.log(error);
        }
    },
});

const upload = multer({ storage: storage });

// Auth function - VerifyToken ---- Global Funcation
// function authJWT(req, res, next) {
//     let token = req.cookies.Token;
//     const privatekey = "aihdkloihgjeosjfyrnbvsjeirnfbdks";
//     jwt.verify(token, privatekey, function(err, user) {
//         if (err) {
//             console.log(err);
//             res.redirect("/login");
//         } else {
//             req.user = user;
//             return next();
//         }
//     });
// }

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

// userhome Page Get Method
router.get("/user/list", authJWT.authJWT, function(req, res, next) {
    res.render("userList");
});

// Export Users Get Routes
router.get("/user/export", async function(req, res) {
    try {
        let fields = [
            { label: "Name", value: "name" },
            { label: "Email", value: "email" },
            { label: "Mobile", value: "mobile" },
        ];
        let csvUsers = await usermodel.find();
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(csvUsers);
        let userCsv = "Users-" + moment().format("YYYY-MM-DD-hh:mm") + ".csv";
        fs.writeFileSync("public/csv/export/" + userCsv, csv);
        res.json({
            type: "success",
            url: config.site.url + "/csv/export/" + userCsv,
            userCsv: userCsv,
        });
    } catch (error) {
        console.log(error);
        res.send({
            type: "error",
            message: "Error During the Export User's...",
        });
    }
});

// Import User's Get Method
router.post(
    "/user/import",
    authJWT.authJWT,
    upload.single("file"),
    async function(req, res) {
        try {
            /* 
              let resultUser = []
              let duplicateUser = 0
              let totalUsers = 0
              let validUser = 0
              let inValidUsers = 0
              // console.log(req.file);
              // console.log(req.file.path);
              const jsonArray = await csv().fromFile(req.file.path);
              let jsonMap = {
                  Name: "name",
                  Email: "email",
                  Mobile: "mobile"
              };
              console.log('File uploed karel che ee ' + stringify(jsonArray));
              totalUsers = Object.keys(jsonArray).length;
              
              for (let userIndx = 0; userIndx < jsonArray.length; userIndx++) {
                  let user = jsonArray[userIndx]
                  if (user.Name && user.Email && user.Mobile) {
                      let matchUser = await usermodel.findOne({
                          $or: [{ email: user.Email }, { mobile: user.Mobile }]
                      });
                      let isMatch = matchUser ? true : false
                      if (isMatch) {
                          duplicateUser++;
                      } else {
                          validUser++;
                          let usersObj = {};
                          usersObj[jsonMap["Name"]] = user.Name;
                          usersObj[jsonMap["Email"]] = user.Email;
                          usersObj[jsonMap["Mobile"]] = user.Mobile;
                          console.log(usersObj)
                          resultUser.push(usersObj);
                      }
                  } else {
                      inValidUsers++;
                  }
              }
              console.log('Query Before Array' + resultUser);
              let importUsers = await usermodel.insertMany(resultUser);
              console.log('InsertMany Array' + importUsers);
              res.json({
                  importUsers: importUsers,
                  validUser: validUser,
                  inValidUsers: inValidUsers,
                  duplicateUser: duplicateUser,
                  totalUsers: totalUsers
                  
              })
              
              */

            const jsonArray = await csv({ noheader: true }).fromFile(req.file.path);
            console.log(jsonArray);
            let jsonKey = Object.values(jsonArray[0]);
            let jsonValue = Object.values(jsonArray[1]);
            let csvHeader = Object.keys(jsonArray[1]);
            let fieldArray = await fieldsModel.findOne({});
            if (fieldArray) {
                var dbField = ["name", "email", "mobile"].concat(fieldArray.fields)
            } else {
                var dbField = ["name", "email", "mobile"]
            }

            console.log('-----------');
            console.log(dbField);
            await filesModel.create({ uploadBy: req.user.userID, name: req.file.filename, status: "Pending" });
            res.json({
                type: "success",
                key: jsonKey,
                csvHeader: csvHeader,
                dbFields: dbField,
                value: jsonValue,
                fileName: req.file.filename,
            });
        } catch (error) {
            console.log(error);
            res.send({ type: "error", message: "Error in UsersImport" });
        }
    }
);
//  Csv Import and Check Validation and Count User;s and

router.post("/user/csvimport/:fileName", async function(req, res) {
    try {
        fileName = req.params.fileName;
        let fieldMap = req.body
        console.log(fieldMap);

        // below Five global var used( User Count and Check Valid and Invalid User's.. );
        // let totalUpload = [];
        // let duplicates = 0;
        // let totalRecords = 0;
        // let validUser = 0;
        // let inValid = 0;

        // below Three global var used( Duplicated User Check form CSV File );
        // let emails = [];
        // let mobiles = [];
        // let filterUsers = [];
        // let csvDuplicateUsers = 0;

        const csvFilePath = "./public/csv/import/" + fileName;
        // const jsonArray = await csv({ noheader: true }).fromFile(csvFilePath);

        // console.log(jsonArray);
        // totalRecords = Object.keys(jsonArray).length;
        // console.log(fieldMap);

        // Check CSv File Duplicates User's
        // for (const jsonAr of jsonArray) {
        //     let name = jsonAr[fieldMap.name];
        //     let email = jsonAr[fieldMap.email];
        //     let mobile = jsonAr[fieldMap.mobile];

        //     if (name && email && checkEmail(email) && checkMobile(mobile)) {
        //         let matchUser = await usermodel.findOne({
        //             $or: [{ email: email }, { mobile: mobile }],
        //         });
        //         let isMatch = matchUser ? true : false;
        //         if (isMatch) {
        //             duplicates++;
        //         } else {
        //             validUser++;
        //             let usersObj = {};
        //             for (const field in fieldMap) {
        //                 usersObj[field] = jsonAr[fieldMap[field]];
        //             }
        //             totalUpload.push(usersObj);
        //         }
        //     } else {
        //         inValid++;
        //     }
        // }
        // console.log('totalRecords', totalRecords)

        // below  Query For Insert Record in UserModel (Record for Final Output in Field Map...)
        // uploadedBy = await usermodel.insertMany(totalUpload);

        // Below Query For Insert Record (Valid and Invalid and Duplicated User Count )
        await filesModel.updateOne({ name: fileName }, { $set: { mappingbj: fieldMap, filePath: csvFilePath } });

        res.json({
            type: "success",
            message: "File Upload Successfully.."
        });
    } catch (error) {
        console.log(error);
        res.json({
            type: "error",
            message: "Error in CSV Import Users.."
        });
    }
});

// Files Model For User Files Data Display -----

router.get('/user/filesmodel', async function(req, res) {
    try {
        let filesData = await filesModel.find({ mappingbj: { $ne: null } });
        // console.log(filesData)
        res.json({
            type: "success",
            filesData: filesData
        });
    } catch (error) {
        console.log(error);
        res.json({
            type: "error",
            message: "Error During the FilesModel Data Geting "
        })
    }
});


// add New Field in Csv ImportFile
router.post("/user/addfield", async function(req, res) {
    try {
        let newFields = req.body.fields;
        await fieldsModel.updateOne({}, { $addToSet: { "fields": newFields } }, { upsert: true })
        let fieldGet = await fieldsModel.findOne({}, { fields: 1 })
        console.log(fieldGet);
        res.json({
            type: "success",
            fieldGet: fieldGet
        });
    } catch (error) {
        console.log(error);
        res.json({ type: "error", message: "Error During the addFields" })
    }
});

// userhome Page Post Method
router.post(
    "/user/list", [
        check("name", "Name is Required"),
        check("email", "Email is Required"),
        check("mobile", "Mobile number is Required"),
        check("password", "Password length should be 6 to 10 characters"),
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
            } else {
                let { name, email, mobile, password } = req.body;
                let user = await usersModel.findOne({
                    $or: [{ email: email }, { mobile: mobile }],
                });
                if (user) {
                    return res.json({
                        type: "error",
                        message: "Already User Existing..",
                    });
                }
                res.json({
                    type: "success",
                    users: await usermodel.create({
                        name: name,
                        email: email,
                        mobile: mobile,
                        password: password,
                    }),
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                type: "error",
                message: "Error During the Data Fech Request",
            });
        }
    }
);

// User's Home Page All Users Display
router.get("/user/getAllUser", async function(req, res) {
    try {
        let allUser = await usermodel.find({}, { _id: 0, password: 0 }).lean();
        res.json({ allUser });
    } catch (error) {
        console.log(error);
        res.send({
            type: "error",
            message: "Error in Get All User's..",
        });
    }
});

// api UserList Routes
router.get("/api/user/list", authJWT.authJWT, function(req, res, next) {
    res.render("userList");
});

// Api UserList Routes (Only Api)
router.post(
    "/api/user/list", [
        check("name").notEmpty().withMessage("Name is Required"),
        check("email").notEmpty().withMessage("Email is Required"),
        check("mobile").notEmpty().withMessage("Mobile number is Required"),
        check("password", "Password length should be 6 to 10 characters").isLength({
            min: 6,
            max: 10,
        }),
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
            } else {
                let { name, email, mobile, password } = req.body;
                let user = await usersModel.findOne({
                    $or: [{ email: email }, { mobile: mobile }],
                });
                if (user) {
                    res.json({
                        type: "error",
                        message: "Already User Existing..",
                    });
                    return;
                }
                let users = await usermodel.create({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: password,
                });
                console.log(users);
                res.json({
                    type: "success",
                    users: users,
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                type: "error",
                message: "Error During the Data Fech Request",
            });
        }
    }
);

// login User's Routes Get Method ( Both API AND UI )
router.get("/login", async function(req, res, next) {
    res.render("login", { title: "Express" });
});

// login User's Routes Post Method ( Both API AND UI )
router.post("/login", async function(req, res, next) {
    try {
        let password = req.body.password;
        let user = await usermodel.findOne({
            $or: [{ email: req.body.email }, { mobile: req.body.email }],
        });
        if (user == null) {
            return res.json("Invalid Details Try Again...");
        } else {
            let params = {
                userID: user._id,
                email: user.email,
                password: user.password,
            };
            console.log(params);
            const privatekey = "aihdkloihgjeosjfyrnbvsjeirnfbdks";
            let token = await jwt.sign(params, privatekey, { expiresIn: "1hr" });
            console.log(token);
            if (password == user.password) {
                res.cookie("token", token);
                res.json({
                    type: "success",
                    messgae: "Login Successfully",
                    data: {
                        token: token,
                        user: user,
                    }
                });
            } else {
                res.json({
                    type: "error",
                    message: "Email or password invalid",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.send({ type: "error", message: "Error in Login" });
    }
});

// Add User's Routes Post Method (Only API Routes)
router.post("/api/login", async function(req, res) {
    try {
        let password = req.body.password;
        let user = await usermodel.findOne({
            $or: [{ email: req.body.email }, { mobile: req.body.email }],
        });
        if (user == null) {
            return res.json("Invalid Details Try Again...");
        } else {
            let params = { email: user.email, password: user.password };
            const privatekey = "aihdkloihgjeosjfyrnbvsjeirnfbdks";
            let token = await jwt.sign(params, privatekey, { expiresIn: "1hr" });
            res.cookie("token", token);
            if ((password, user.password)) {
                res.json({ messgae: "Login Successfully", token });
            } else {
                res.json("Email or password invalid");
            }
        }
    } catch (err) {
        console.log(err);
        res.send({ type: "error", message: "api login Error" });
    }
});

// User's Logout Routes (Both API AND UI)
router.get("/api/logout/", async function(req, res) {
    res.clearCookie("Token");
    res.redirect("/login");
});

module.exports = router;