let createError = require('http-errors');
let express = require('express');
let methodOverride = require('method-override');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

require('./api/models/db');
let indexRouter = require('./mvc/routes/index');
let apiRouter = require('./api/routes/index');
let countryRouter = require('./mvc/routes/countries');

let app = express();
app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, 'mvc', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    next();
});

app.use((req,res,next)=> {
    res.statusJson = function (statusCode, data) {
        let obj = {
            ...data,
            statusCode : statusCode
        }
        res.status(statusCode).json(obj);
    }
    next();
})

app.use('/', indexRouter);
app.use('/api',apiRouter);
app.use('/countries',countryRouter);
app.use("*",(req,res)=>{
    res.render("404", { title :"404" });
});

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