var createError = require('http-errors'); 
const dotenv = require('dotenv')
const {port, host} = require('./config/config');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions=require('./config/swaggerOptions');
const mailTransporter = require('./config/mailTransporter');
var app = express();

// view engine setup
const specs = swaggerJsdoc(swaggerOptions);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/mail', function(){
  const mailOptions = {
    from: "example@gmail.com",
    to: "ndaisahumarrabi@gmail.com",                   // from req.body.to
    subject: "test",         //from req.body.subject
    html: "this is just a test email"             //from req.body.message
  };

  mailTransporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err)
    }

    return info
  });
})
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
