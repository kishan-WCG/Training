var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const nodemailer = require("nodemailer");
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var productRouter = require('./routes/product');
var stateRouter = require('./routes/state');
var cityRouter = require('./routes/city');
var areaRouter = require('./routes/area');
var adminRouter = require('./routes/admin');
// var cartRouter = require('./routes/cart');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
// app.set('view engine', 'hbs');
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 600000 }
}))
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test1234:test1234@localhost:27017/test1234')
    .then(() => console.log("Connection DB Open"))
    .catch((err) => console.error(err));

app.use('/', indexRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/subcategory', subcategoryRouter);
app.use('/admin/product', productRouter);
app.use('/admin/state', stateRouter);
app.use('/admin/city', cityRouter);
app.use('/admin/area', areaRouter);
app.use('/admin/account', adminRouter);
// app.use('/cart', cartRouter);

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