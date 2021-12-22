var express = require('express');
var router = express.Router();
let signUp = require('../model/signUp');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
require('../passport-jwt')(passport);

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log("Passsport Called " + email + password);
    signUp.findOne({email: email }, function(err, user) {
      console.log(user)
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  signUp.findOne({ email:email }, function(err, user) {
    done(err, user);
  });
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signUp', async function(req, res, next) {
  res.render('signUp');
});

router.post('/signUp', async function(req, res, next) {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hashpassword = bcrypt.hashSync(req.body.password,salt);
    let {name , email, mobile,  gender,  } = req.body;
    await signUp.create({name:name, email:email, mobile:mobile, gender:gender, password:hashpassword, });
    res.redirect('/login')
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/login', async function(req, res, next) {
  res.render('login');
});


router.get('/profile', function(req, res, next) {
  if(req.user){
  console.log(req.user)    
    res.render('profile',{user:req.user});
  }else{
    res.redirect('/login')
  }
});

router.get('/loginfail', function (req, res, next) {
  res.send("Login Failed");
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect("/login");
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local',{
    successRedirect :'/profile',
    failureRedirect : '/loginfail',
})(req,res,next);    
});


router.post('/api/signUp', async function(req, res, next) {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hashpassword = bcrypt.hashSync(req.body.password,salt);
    let {name , email, mobile,  gender,  } = req.body;
    await signUp.create({name:name, email:email, mobile:mobile, gender:gender, password:hashpassword, });
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
      if(bcrypt.compareSync(password, user.password)){
        res.json({messgae:"Login Successfully", token });
      }else{
        res.json("Email or password invalid")
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/api/profile',  passport.authenticate('jwt', {session:false}), function(req, res, next) {
  res.send({ type: "success", messaage: "Profile Page", users: req.user });
});


router.post('/api/changepassword',passport.authenticate('jwt', {session:false}), async function(req,res) {
  let { oldPassword, newPassword } = req.body;
    try {
        let user = await signUp.findOne({email : req.user.email}).lean();
        bcrypt.compare(oldPassword, user.password, function(err, resp){
            if(resp){
                bcrypt.genSalt(8, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if(err){
                            return res.json({status : "error",  message : "Error in change password, try again..."});
                        }
                        signUp.updateOne({email : req.user.email}, {password : hash}, function(err, data){
                            if(err){
                                console.log(err);
                                return res.json({status : "error",  message : "Error in change password, try again..."});
                            }
                            return res.json({status : "success", message : "Password changed..."});
                        });
                    });
                });
            } else {
                return res.json({status : "error",  message : "Error in change password, try again..."});
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({ status : "error", message : "Error in change password, try again..."});        
    }
  
});

module.exports = router;
