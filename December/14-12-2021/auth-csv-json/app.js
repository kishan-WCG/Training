var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');

global.config = require('./config/config.json');
global.authJWT = require('./globalFuncation/auth');
const validationGlobal = require('./globalFuncation/regularExpression');
global.checkEmail = validationGlobal.checkEmail;
global.checkMobile = validationGlobal.checkMobile;


let userModel = require('./model/usersModel');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

async function connectiondb() {
    try {
        await mongoose.connect(
            `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.localhost}:${config.mongodb.port}/${config.mongodb.database}`);
        console.log(`Server Start On ${config.port}`);
        app.listen(config.port, async function() {
            console.log('App Starting');
            require('./services/admin');
        });

    } catch (error) {
        console.log(error);
        console.log('Databse Connection Errro');
    }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

connectiondb();
// module.exports = app;