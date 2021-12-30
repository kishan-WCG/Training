var express = require('express');
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const csv = require('csvtojson')
const csvFilePath = './public/csv/DATA.csv';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/csv/");
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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', upload.single("myfile"), async function(req, res, next) {
    try {
        console.log(req.file);
        console.log(req.file.mimetype)
        if (req.file.mimetype === "text/csv") {
            let users = await csv().fromFile(req.file.path);
            fs.writeFile('DATA.json', JSON.stringify(users, null, 19), (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('JSON Array Saved...');
                console.log(users)
                res.redirect('/')
            });
        }
    } catch (err) {
        console.log(err)
    }

});

module.exports = router;