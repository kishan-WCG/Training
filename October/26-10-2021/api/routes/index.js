var express = require('express');
var router = express.Router();
const user = require('../model/User')
var fetch = require('node-fetch')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const response = await fetch('http://localhost:3001/users');
    const user = await response.json();
    res.render('index', { user })
});

module.exports = router;