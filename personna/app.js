var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./controllers/index');
var users = require('./controllers/users');
var bodySection = require('./controllers/bodySectionController');
var equipment = require('./controllers/equipmentController');
var exerciseType = require('./controllers/exerciseTypeController');
const PersonnaDb = require('./dao/personnaDb').PersonnaDb;
const dbConnection = new PersonnaDb();
const PersonnaLogger = require('./util/logger').PersonnaLogger;

var app = express();
var personnaLogger = new PersonnaLogger();

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
// Open DB Connection
dbConnection.openMongooseConnection();

// set the common logger
app.use(function(req, res, next) {
  req.app.locals.personaLogger = personnaLogger;
  next();
})

app.use('/', index);
app.use('/users', users);
app.use('/bodySection', bodySection);
app.use('/equipment', equipment);
app.use('/exercisetype', exerciseType);

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
    // console.log('Error 1');
    res.status(err.status || 500);
    // const perLogger = req.app.locals.personaLogger;
    // perLogger.logError(err);
    if (res.headersSent) {
      return next(err);
    }
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  // console.log('Error 2'); 
  res.status(err.status || 500);
  const perLogger = req.app.locals.personaLogger;
  perLogger.logError(err);
  if (res.headersSent) {
    return next(err);
  }
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
