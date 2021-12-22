let express = require('express');
let router = express.Router();
let passport = require('passport');
let signUp = require('../model/signUp');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
require('../passport-jwt')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/contact', passport.authenticate('jwt', {session:false}), (req,res)=>{
  res.send('Hello i am Contact Page..!!')
});


router.post('/api/signUp', async function(req, res, next) {

  try {
    let salt = bcrypt.genSaltSync(10);
    let hashpassword = bcrypt.hashSync(req.body.password,salt);
    let {name , email,  } = req.body;
    await signUp.create({name:name, email:email, password:hashpassword});
    res.json({message:"Record Added.."})
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/api/login', async function(req, res, next) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await signUp.findOne({email:email}).lean();
 
    if(user == null){
      return res.json('Email or Password inValid');
    }else{
      let params= {email:user.email, name:user.name};
      const privatekey = "aihdkloihgjeosjfyrnbvsjeirnfbdks";
      let token =  await jwt.sign(params, privatekey,{expiresIn:'1hr'});
      console.log(token);
      if(password == user.password){
        res.json({messgae:"Login Successfully"});
      }else{
        res.json("Email or password invalid")
      }
    }
  } catch (error) {
    console.log(error)
  }
});


router.post('/change-password', async function (req, res, next) {
      let newpass = req.body.newpass;
      let oldpass = req.body.password;
      let email = req.body.email;
      let user = await signUp.findOne({email:email}).lean();
 
      bcrypt.compare(newpass , oldpass, function (err ,resp){

        if(resp){
          signUp.updateOne({password:oldpass},{password :newpassword}, function(err, data){
            if (err){
              return res.json({status:"Error", message:"Error in ChangePassword"})
            }
            res.json({status:"Success",message:"User Password Updated successfully"})
          });
        }

      });
});
module.exports = router;
