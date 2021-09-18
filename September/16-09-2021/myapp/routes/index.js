var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/student', function(req, res, next) {
  res.render('index', { title: 'student' });
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
