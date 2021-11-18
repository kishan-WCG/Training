"use strict";
var express = require('express');
const users = require('../model/users');
var router = express.Router();

// Multer Image Upload
const multer = require("multer");
const { findById, find } = require('../model/users');
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
        var userSorting = {};
        var findObj = {};
        try {
            console.log(JSON.stringify(req.query))
                // console.log(req.query.srchGender);
            let totalUsers = await users.countDocuments();
            var user;
            if (req.query.page) {
                var skip = 5 * (Number(req.query.page) - 1);
                // console.log(skip)
                // user = await users.find().skip(skip).limit(3).lean();
            }
            if (req.query.sortField) {

                userSorting[req.query.sortField] = Number(req.query.field);
                user = await users.find().sort({ fName: req.query.sortField }).limit(3).lean();
            }
            // console.log("-----------------------" + JSON.stringify(userSorting));
            if (req.query.srchGender || req.query.srchBox) {
                if (req.query.srchGender) {
                    findObj["gender"] = req.query.srchGender;
                }
                if (req.query.srchBox) {
                    findObj["$or"] = [{
                            fName: { $regex: req.query.srchBox }
                        },
                        { lName: { $regex: req.query.srchBox } },
                        {
                            address: { $regex: req.query.srchBox }
                        }
                    ]
                }
            }
            user = await users.find(findObj).sort(userSorting).skip(skip).limit(5).lean();
            // console.log("sorting", user);
            // console.log(skip)
            // console.log(JSON.stringify(findObj))
            res.json({ data: user, totalUsers });
        } catch (error) {
            console.log(error);
            res.json({ Message: "Can not Find Data " });
        }
    })
    // pagenation

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
        var user = await users.find().lean();
        res.render('index', { users: user });
    } catch (error) {
        console.log(error);
        res.json({ Message: "Can not Find Data " });
    }
});
// Add User Router
router.post('/', upload.single("image"), async function(req, res, next) {
    try {

        var userObj = {
            fName: req.body.fName + "" + req.body.lName,
            hobbies: req.body['hobbies'],
            address: req.body.address,
            gender: req.body.gender,
            interest: req.body.interest,
            image: req.file.filename
        }
        console.log(JSON.stringify(userObj))
        console.log(req.body.lName)
        res.json({
            type: "success",
            message: "Adding User",
            user: await users.create({ userObj }),
        });
    } catch (err) {
        console.log(err);
        res.json({ type: "error", message: "Something Went Wrong" });
    }
});

// UpdateUser Router
router.put('/:id', upload.single("image"), async function(req, res) {
    try {
        console.log()
            // let { fName, lName, address, gender, interest } = req.body;
        console.log(req.body.lName);
        var userdata = {
            fName: req.body.fName + "" + req.body.lName,
            hobbies: req.body['hobbies'],
            address: req.body.address,
            gender: req.body.gender,
            interest: req.body.interest
        }
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