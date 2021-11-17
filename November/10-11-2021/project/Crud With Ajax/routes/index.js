"use strict";
var express = require('express');
const users = require('../model/users');
var router = express.Router();

// Multer Image Upload
const multer = require("multer");
const { findById } = require('../model/users');
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
router.get('/sort/:field', async function(req, res) {
        try {

            let userFind = await users.find().sort({ fName: req.params.field }).limit(3).lean();
            res.json({
                type: "success",
                message: "success msg",
                data: userFind
            });
        } catch {
            res.json({ type: "error", message: "Error During the Sorting Name" });
        }
    })
    // pagenation
router.get('/userData', async function(req, res) {
        try {
            console.log(req.body.val)
            let skip = 3 * (Number(req.body.val) - 1);
            var user = await users.find().skip(skip).limit(3).lean();
            // var count = await users.find().count();
            res.json(user);
        } catch (error) {
            console.log(error);
            res.json({ Message: "Can not Find Data " });
        }
    })
    // Display User 
router.get('/page', async function(req, res) {
    try {
        var user = await users.find().skip().limit(3).lean();
        var count = await users.find().count();
        res.json({ users: user, count: count });
    } catch (error) {
        console.log(error);
        res.json({ Message: "Can not Find Data " });
    }
})

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
        // console.log(count)
        var countArr = [];
        for (let i = 0; i < Math.ceil(count / 5); i++) {
            countArr.push(i)
        }
        // console.log(countArr)
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
    // SearchBar
router.post('/srch', async function(req, res) {
    try {
        // var search = req.params.srch
        // console.log(search)
        var srchVal = req.body.serachVal
        var srchFind = await users.find({
            $or: [
                { fName: { $regex: srchVal } },
                { lName: { $regex: srchVal } },
                { address: { $regex: srchVal } },
                { lName: { $regex: srchVal } },
            ]
        }).limit(3).lean();
        res.json({
            type: "success",
            message: "Searching Done..",
            search: srchFind,
        });
    } catch (err) {
        console.log(err);
        res.json({ type: "error", message: "Error During the searching.." });
    }
});




module.exports = router;