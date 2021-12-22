const express = require('express');
const singUp = require('../model/singUp');
const { create } = require('../model/singUp');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/SignUp', function(req, res, next) {
  res.render('SignUp');
});

router.post('/SignUp', async function(req, res, next) {
  try{
    let {name, email , password} = req.body;
    await singUp.create({name:name, email:email, password:password});
    res.redirect('/');
  }
  catch(error){
    console.log(error);
    res.redirect('/SignUp');
  }
   
})

router.get('/SignIn', function(req, res, next) {
  res.render('SignIn');
});

router.post('/SignIn', async function(req, res, next) {
  try{
    let email = req.body.email;
    let password = req.body.password;
    let user =  await  singUp.findOne({email : email});
      if(user == null)
      {
        return res.json("Email Or Password Invalid");
      }else{
        if(password == user.password)
        {
          res.redirect("/");
        }else{
          res.json("Email Oe Password Invalid");
        }
      }
  }
  catch(error){
    console.log(error);
    res.redirect('/SignUp');
  }

});

const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log("Passsport Called " + username + password);
    singUp.findOne({email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
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
  singUp.findOne({ email:email }, function(err, user) {
    done(err, user);
  });
});

router.get('/login', function (req, res, next) {
  res.render('signIn');
});

router.get('/logout', function (req, res, next) {
  let userid = req.user._id;
  console.log(userid);
  req.logout();
  res.redirect("/login");
});

router.get('/welcome', function (req, res, next) {

  if(req.user){
    res.render('welcome', {user:res.locals.users});
  }else{
    res.redirect('/login');
  }
});

router.get('/home', function (req, res, next) {
   if(req.user){
    res.render('home');
  }else{
    res.redirect('/login');
  }
});

router.get('/about', function (req, res, next) {
   if(req.user){
    res.render('about',{user:res.locals.users});
  }else{
    res.redirect('/login');
  }
});

router.get('/contact', function (req, res, next) {
  if(req.user){
    res.render('contact',{user:res.locals.users});
  }else{
    res.redirect('/login');
  }
  
});

router.get('/loginfail', function (req, res, next) {
  res.send("Login Failed");
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local',{
    failureRedirect : '/loginfail',
    successRedirect :'/welcome',
})(req,res,next);
});

// API ROUTER

router.post('/api/signUp',async function (req, res, next) {
  try{
    let {name, email , password} = req.body;
    await singUp.create({name:name, email:email, password:password});
    res.json({flag:1, message:"Record Save Successfully"});
     }
  catch(error){
    console.log(error);
    res.redirect('/SignUp');  
  }
});

router.post('/api/login',async function (req, res, next) {
  try{
    let email = req.body.email;
    let password = req.body.password;
    let user =  await  singUp.findOne({email : email});
      if(user == null)
      {
        return res.json("Email Or Password Invalid");
      }else{
        if(password == user.password)
        {
          res.json({flag:1, message:"Login Successfully"});
        }else{
          res.json("Email Oe Password Invalid");
        }
      }
  }
  catch(error){
    console.log(error);
    res.redirect('/SignUp');
  }
});

module.exports = router;
