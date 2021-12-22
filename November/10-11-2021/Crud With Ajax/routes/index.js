"use strict";
var express = require('express');
const users = require('../model/users');
var router = express.Router();
// Multer Image Upload
const multer = require("multer");
const nodemailer = require("nodemailer");
const moment = require("moment")
const { findById, find } = require('../model/users');
const { Parser } = require('json2csv');
const fs = require("fs");
const { url } = require('inspector');
// Multer File Uploader.....
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = multer({ storage: storage });
// Get Method By Sort
router.get('/api/getUsers', async function(req, res) {
    try {
        let userSorting = {};
        let findObj = {};
        let totalUsers = await users.countDocuments();
        let user;
        let fields = [{ label: "firstName", value: "fName" }, { label: "lastName", value: "lName" }, { label: "Address", value: "address" },
            { label: "Gender", value: "gender" }, { label: "InterestValue", value: "interest" }, { label: "Hobbies", value: "hobbies" }
        ];
        if (req.query.page) {
            var skip = 5 * (Number(req.query.page) - 1);
        }
        if (req.query.sortField) {
            if (req.query.sortField == "name") {
                req.query.sortField = "fName";
            }
            userSorting[req.query.sortField] = Number(req.query.field);
        }
        if (req.query.srchGender || req.query.srchBox) {
            if (req.query.srchGender) {
                findObj["gender"] = req.query.srchGender;
            }
            if (req.query.srchBox) {
                findObj["$or"] = [{ fName: { $regex: req.query.srchBox, $options: "i" } }, { lName: { $regex: req.query.srchBox, $options: "i" } }, { address: { $regex: req.query.srchBox, $options: "i" } }]
            }
            totalUsers = await users.countDocuments(findObj)
        }
        if (req.query.export || req.query.emailUrl) {
            let csvUsers = await users.find(findObj).sort(userSorting).lean();
            if (req.query.export) {
                const json2csvParser = new Parser({ fields });
                const csv = json2csvParser.parse(csvUsers);
                let fileName = "Users-" + moment().format('YYYY-MM-DD hh:mm') + ".csv";
                fs.writeFileSync("public/csv/" + fileName, csv);
                res.json({ url: "http://localhost:3000/csv/", fileName: fileName });
                return;
            }
            if (req.query.emailUrl) {
                const json2csvParser = new Parser({ fields });
                const csv = json2csvParser.parse(csvUsers);
                let fileName = "Users-" + moment().format('YYYY-MM-DD hh:mm') + ".csv";
                fs.writeFileSync("public/csv/" + fileName, csv);
                let email = req.query.emailVal;
                let url = "http://localhost:3000/csv/" + fileName + "";
                async function main() {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "ravi.malaviya.3795@gmail.com",
                            pass: "ravi@3795",
                        },
                    });
                    let info = await transporter.sendMail({
                        from: '"Fred Foo 👻" <foo@example.com>', // sender address
                        to: email, // list of receivers
                        subject: "Users Report", // Subject line
                        text: "Click The Link And Download Users", // plain text body
                        html: 'Download Users report, <a href="' + url + '">Click Here</a>', // html body
                        attachments: [{
                            path: url
                        }]
                    });
                    console.log("Message sent:", info.messageId);
                }
                main().catch(console.error);
            }
        }
        user = await users.find(findObj).sort(userSorting).skip(skip).limit(5).lean();
        res.json({ data: user, totalUsers });
    } catch (error) {
        console.log(error);
        res.json({ message: "Can not Find Data " });
    }
});
// Update User 
router.get('/:id', async function(req, res) {
        try {
            let editUser = await users.findOne({ _id: req.params.id }).lean()
            res.json({
                type: "success",
                data: {...editUser, hobbies: editUser.hobbies[0].split(",") }
            })
        } catch (error) {
            console.log(error);
            res.json({ type: "error", message: "Error During the Data Fech Request" });
        }
    })
    /* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        let user = await users.find().lean();
        res.render('index', { users: user });
    } catch (error) {
        console.log(error);
        res.json({ message: "Can not Find Data " });
    }
});
// Add User Router
router.post('/', upload.single("image"), async function(req, res, next) {
    try {
        let { fName, lName, address, gender, interest, } = req.body;
        res.json({
            type: "success",
            message: "Adding User",
            user: await users.create({ fName, lName, hobbies: req.body['hobbies'], address, gender, interest, image: req.file.filename }),
        });
    } catch (err) {
        console.log(err);
        res.json({ type: "error", message: "Something Went Wrong" });
    }
});

// UpdateUser Router
router.put('/:id', upload.single("image"), async function(req, res) {
    try {
        let { fName, lName, address, gender, interest } = req.body;
        let userdata = { fName, lName, hobbies: req.body['hobbies'], address, gender, interest }
        if (req.file) {
            userdata["image"] = req.file.filename
        }
        res.json({
            type: "success",
            message: "User Update Successfully ",
            user: await users.findByIdAndUpdate(req.params.id, userdata, { new: true })
        });

    } catch (err) {
        console.log(err);
        res.json({ type: "error", message: "Something Went Wrong" });
    }
});
// Delete User
router.delete('/:id', async function(req, res) {
    try {
        res.json({
            type: "success",
            message: "User Deleted Successfully ",
            userDelete: await users.findByIdAndDelete(req.params.id)
        });
    } catch (err) {
        console.log(err);
        res.json({ type: "error", message: "Error During the Delete Userr...." });
    }
})


module.exports = router;