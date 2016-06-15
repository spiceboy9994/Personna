var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// const PersonnaDb = require('./dao/personnaDb').PersonnaDb;
const MongoClient = require('mongodb').MongoClient;
var index = require('./controllers/index');
var users = require('./controllers/users');
var bodySection = require('./controllers/bodySection');
var  personnaDb;
//DB
//var mongo = require('mongodb');


var app = express();


MongoClient.connect('mongodb://localhost:27017/personna', function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log('all good');
    app.locals.db = db;
    personnaDb = db
    // database = db;//new PersonnaDb("http://localhost:27017");
    // console.log(personnaDb);
    app.use(function(req, res, next) {

      console.log('---->midle');
      req.db = personnaDb;
      
      console.log(req.db);
    });
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/bodySection', bodySection);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
