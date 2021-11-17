var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');

const handlebars = require('handlebars');


handlebars.registerHelper('sum', function(value1, value2) {
    return (value1) + value2;

});


handlebars.registerHelper('reverseWord', function(value) {
    var reverseWord = value.split("").reverse().join('-')
    return reverseWord;
});
var app = express();

mongoose.connect('mongodb://admin:admin@localhost:27017/api')
    .then(() => { console.log('server is Sarting At Port Number 3000'); })
    .catch((err) => { console.log(err); })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    handlebars: handlebars
}));
app.set('view engine', 'handlebars')

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

module.exports = app;