const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const session = require('express-session'); 
const app = express();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const singUp = require('./model/singUp');
const categories = require('./model/categories');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))
app.use(passport.initialize());
	app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/passport")
  .then(() => console.log("Connection Open"))
  .catch((error)=>console.log(error))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async(req,res,next)=>{
  
  let user = await categories.find().lean();
  // let user = await  singUp.find().lean();
   res.locals.users = user;
  //  res.locals.categories = categories;
   next();
   
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
