let express = require('express');
let router = express.Router();
let signUp = require('../model/signUp');
let jwt = require('jsonwebtoken');
let passport = require('passport');
require('../passport-jwt')(passport);

// function authJWT(req,res, next){
//   let token = req.headers.authorization;
//   console.log(token)
//   token = token.split(' ')[1];
//   const privatekey = "aihdkloihgjeosjfyrnbvsjeirnfbdks";
//   jwt.verify(token, privatekey, function(err , users){
//     if(err){
//       res.send('Token inValid');
//     }else{
//       next();
//     }
//   });
// }


// Passport JWT
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/contact', authJWT, (req, res)=>{
//   res.send('Im contact Us Page')
// });


  router.post('/contact', passport.authenticate('jwt', {session:false}), (req,res)=>{
    res.send('Hello i am Contact Page..!!')
  });

router.post('/api/signUp', async function(req, res, next) {
  try {
    let {name , email, password } = req.body;
    await signUp.create({name:name, email:email, password:password});
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
    
  }
});

module.exports = router;
