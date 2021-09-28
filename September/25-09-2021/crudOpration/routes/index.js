var express = require('express');
var dotenv = require('dotenv');

var router = express.Router();
var app = express();

dotenv.config();

// Moggose Connect


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
