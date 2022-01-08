var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var cors = require('cors');


var app = express();

//my routers are
var userRouter = require('./routes/api/user');
var dramaRouter = require('./routes/api/drama');
var episodeRouter = require('./routes/api/Episode')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/dramas',dramaRouter);
app.use('/api/episodes',episodeRouter);

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

mongoose.connect("mongodb+srv://abdulman4401:Abdul7823@cluster0.zkmvn.mongodb.net/DramaDb?retryWrites=true&w=majority").then(res=>{
  console.log("Connected To Mongoose");
}).catch(err=>{
  console.log("Not Connected "+err);
})

module.exports = app;
