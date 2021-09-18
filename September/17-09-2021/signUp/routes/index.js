var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signUp', function(req, res, next) {
  res.render('signUp');
});

router.post('/signUp', function(req, res, next) {
  console.log(req.body)
  var email = req.body.text1
  var pass = req.body.text2
  var cpass = req.body.text3
  

  res.render('sign-output',{ mye:email,myp:pass,mycpass:cpass})
});


module.exports = router;
