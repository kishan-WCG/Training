var express = require('express');
const signUp = require('../model/signUp');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/SignUp', function(req, res, next) {
  res.render('SignUp');
});

router.post('/SignUp', function(req, res, next) {
  var bodydata = {
    name : req.body.name,
    email : req.body.email,
    gender : req.body.gender ,
    dob : req.body.dob,
    password : req.body.password,
    address : req.body.address,
    city : req.body.city,
    age : req.body.age,
    phone : req.body.phone,
    skype : req.body.skype
  }
  console.log(bodydata)
  var data = signUp(bodydata)
   data.save((erroe)=>{
      if (erroe){
        console.log('Error in Inset Record ')
      }else{
        console.log(' Record Added..!')
        res.redirect('/SignIn')
      }
   })
  
   
});


router.get('/SignIn', function(req, res, next) {
  res.render('SignIn')
});

router.post('/SignIn', function(req, res, next) {
  // var my = req.body.email;
  // req.session.semail = my;
  // console.log(req.session.semail)
  // res.redirect('/home')
  let email = req.body.email;
  let password = req.body.password;

  signUp.findOne({email : email}).then((user)=>{

    if(user == null)
    {
      return res.json("Email Or Password Invalid");
    }else{
      if(password == user.password)
      {
        req.session.user = email;
        res.redirect("/home");
      }else{
        res.json("Email Oe Password Invalid")
      }
    }

  }).catch((err)=>{
    console.log(err);
  })
  



  
});

router.get('/home', function(req, res, next) {
  console.log(req.session.user)
 
  if (req.session.user){
     
    signUp.findOne({email : req.session.user}).lean().then((user)=>{
      console.log(user)
      res.render("home", {user : user})
  }).catch((err)=>{
    console.log(err);
  })
  }else{
    res.redirect('/SignIn')

  }
});

router.get('/logout', function(req, res){

    req.session.destroy((error ,data)=>{
      if(error){
        console.log('Errr in Logout')
      }else{
        console.log('Logout ..!' + data)
        res.redirect('/SignIn')
      }
    })
})

router.post('/changepassword', function(req, res){
  if (req.session.user) {
    let oldpass = req.body.password;
    signUp.findOne({email : req.session.user})
      .then((data) => {
        console.log(data);
        if (oldpass != data.password) {
          let msg1 = "Enter Your Old Password";
          res.render("SignUp", { msg1: msg1 });
        } else {
          let newpass = req.body.newpassword;
          if (oldpass == newpass) {
            let msg2 = "It's your current password please set new password";
            res.render("SignUp", { msg2: msg2 });
          } else {
            let newpass = req.body.newpassword;
            console.log(newpass)
            let repass = req.body.repassword;
            if (newpass == repass) {
              data.password = newpass;
              data
                .save()
                .then(() => {
                  return res.redirect("/home");
                })
                .catch((err) => {
                  throw err;
                });
            } else {
              let msg3 = "Password not match";
              res.render("home", { msg3: msg3 });
            }
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  }
})




module.exports = router;
