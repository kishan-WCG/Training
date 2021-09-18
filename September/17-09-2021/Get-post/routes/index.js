var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/form', function(req, res, next) {
  res.render('form');
});


router.post('/form', function(req, res, next) {
  console.log(req.body)
  var u = parseInt(req.body.uname)
  var p = parseInt(req.body.psw)
  var result =  u + p

  res.render('ans',{myu:u, myp:p,myresult:result})
});

module.exports = router;
