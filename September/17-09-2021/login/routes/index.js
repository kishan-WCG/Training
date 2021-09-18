var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  console.log(req.body)
  let email = "kishan"
  let pass = "pass"
  var e = req.body.email
  var p = req.body.pass
  if (e == email && p== pass){
    res.render('sign-output')
  }
  else{

    
      res.send('Please Enter a valid email And Password')
  }
 
});

module.exports = router;
