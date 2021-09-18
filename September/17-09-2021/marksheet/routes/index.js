var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/result', function(req, res, next) {
  res.render('result');
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  var sname = req.body.text1
  var std = req.body.text2
  var sub1 = parseInt(req.body.text3)
  var sub2 = parseInt(req.body.text4)
  var sub3 = parseInt(req.body.text5)
  var sub4 = parseInt(req.body.text6)
  var sub5 = parseInt(req.body.text7)
  if (sub1 <=100 &&  sub2 <=100 && sub3 <=100 && sub4 <=100 && sub5 <=100 ){
    var result =  sub1 + sub2 + sub3 + sub4 + sub5

  res.render('result',{mysname:sname, mystd:std,mysub1:sub1, mysub2:sub2, mysub3:sub3, mysub4:sub4, mysub5:sub5, myresult:result})
  }
 else{
   res.send('Please Enter Less Than 100 Mark')
 }


});


module.exports = router;
