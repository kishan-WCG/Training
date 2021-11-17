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
        try {
            console.log(req.query)
            console.log(req.query.srchGender)
            if (req.query.page) {
                let skip = 3 * (Number(req.query.page) - 1);
                var user = await users.find().skip(skip).limit(3).lean();
            }
            if (req.query.sortField) {
                user = await users.find().sort({ fName: req.query.sortField }).limit(3).lean();
            }
            if (req.query.srchGender || req.query.srchBox) {
                var userSorting = {}
                if (req.query.srchGender) {
                    userSorting["gender"] = req.query.srchGender;
                }
                if (req.query.srchBox) {
                    userSorting["fName"] = req.query.srchBox;
                }
                console.log(userSorting)
                user = await users.find(userSorting).limit(3)

                // if (req.query.srchGender) {
                //     user = await users.find({ gender: req.query.srchGender }).limit(3)
                // }
                // if (req.query.srchBox) {
                //     user = await users.find({
                //         $or: [{ fName: { $regex: req.query.srchBox } },
                //             { lName: { $regex: req.query.srchBox } },
                //             { address: { $regex: req.query.srchBox } },
                //         ]
                //     }).limit(3).lean();
                // }
            }


            res.json(user);
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
        var count = await users.find().count();
        var pagelen = Math.ceil(count / 3);
        var countArr = [];
        for (let val = 0; val < pagelen; val++) {
            countArr[val] = 1 + val;
        }
        res.render('index', { users: user, arrCount: countArr });
    } catch (error) {
        console.log(error);
        res.json({ Message: "Can not Find Data " });
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
        var userdata = { fName, lName, hobbies: req.body['hobbies'], address, gender, interest }
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