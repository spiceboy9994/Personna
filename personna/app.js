/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
var express = require('express');
const exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var providersConfig = require('./config/oauthProviders').OauthProviders;
var facebookProvider = require('./config/facebook-passport').FacebookPassport;
const rootPath = path.normalize(__dirname);

const PersonnaDb = require('./dao/personnaDb').PersonnaDb;
const dbConnection = new PersonnaDb();
const PersonnaLogger = require('./util/logger').PersonnaLogger;

var app = express();
var personnaLogger = new PersonnaLogger();

// view engine setup
// view engine setup
console.log(rootPath);

app.engine('.html', exphbs({
  layoutsDir: rootPath + '/views/layouts/',
  extname: '.html',
  defaultLayout: 'public',
  partialsDir: [rootPath + '/views/partials/'],
}));
app.set('views', rootPath + '/views/');
app.set('view engine', '.html');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Open DB Connection
dbConnection.openMongooseConnection();

app.set('dbAccess', dbConnection); 
app.set('customLogger', personnaLogger);

console.log(dbConnection);
// get the services
const services = require('./services/admin/include')(dbConnection);

// // TODO Best approach for classes using controllers and services
app.set('services', services);


// set oauth providersConfig
app.use(flash());
const FB_OAUTH = new facebookProvider(providersConfig, passport);
app.use(passport.initialize());
app.use(passport.session());


app.set('authPassport', passport);

// add controller routes
require('./controllers/admin/routes')(app, passport);
require('./controllers/public/routes')(app, passport);

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
     console.log('Error 1');
    res.status(err.status || 500);
    personnaLogger.logError(err);
    console.log(err);
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
   console.log('Error 2'); 
  res.status(err.status || 500);
   personnaLogger.logError(err);
    console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
