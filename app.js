var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var session = require('express-session');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyparser = require('body-parser')
require('dotenv').config();


var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/registeration')
var loginRouter = require("./routes/registeration")
var studentRouter = require("./routes/student")

//-------------------------------------Using modules middlewares
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')))

//-------------------------------------Creating a server
var IS_PRODUCTION = app.get('env') === 'production'
if (IS_PRODUCTION) {
    app.set('trust proxy', 1) // secures the app if it is running behind Nginx/Apache/similar
}
app.use(session({
    secret: 'keyword cat', //<-- this should be a secret phrase 
    cookie: { secure: IS_PRODUCTION },//<-- secure only on production 
    resave: true,
    saveUninitialized: true
}))


//-------------------------------------Connect to DataBase
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("***********************Successfully Connected To Database ***********************");
}).catch(console.error);



//-------------------------------------Creating middleware to use my routes
app.use('/', indexRouter);
app.use('/api/v1', signupRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/users', usersRouter);

app.use('/api/v1/image', express.static('public/images'))

//-------------------------------------Create and error object,catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


//-------------------------------------Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        success: false,
        message: err.message
    });
});



module.exports = app;
