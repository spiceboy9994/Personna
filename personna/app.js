var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var controllers
var index = require('./controllers/index');
var users = require('./controllers/users');
var bodySection = require('./controllers/bodySectionController');
var equipment = require('./controllers/equipmentController');
var exerciseType = require('./controllers/exerciseTypeController');
var exercise = require('./controllers/exerciseController');
var modifier = require('./controllers/modifierController');
var muscle = require('./controllers/muscleController');
// Services
const BodySectionService  = require('./services/bodySectionService').BodySectionService;
const EquipmentService  = require('./services/equipmentService').EquipmentService;
const ModifierService  = require('./services/modifierService').ModifierService;
const MuscleService  = require('./services/muscleService').MuscleService;
const ExerciseTypeService  = require('./services/exerciseTypeService').ExerciseTypeService;
const ExerciseService  = require('./services/exerciseService').ExerciseService;


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


app.set('dbAccess', dbConnection); 
app.set('customLogger', personnaLogger);
//bodySection.configure(dbConnection);
// TODO Best approach for classes using controllers and services
const services = {
  Modifier: new ModifierService(dbConnection),
  BodySection: new BodySectionService(dbConnection),
  Equipment: new EquipmentService(dbConnection),
  ExerciseType: new ExerciseTypeService(dbConnection),
  Muscle: new MuscleService(dbConnection),
  Exercise: new ExerciseService(dbConnection),
}

console.log(dbConnection);
// // TODO Best approach for classes using controllers and services
app.set('services', services);



app.use('/', index);
app.use('/users', users);
app.use('/bodySection', bodySection);
app.use('/equipment', equipment);
app.use('/modifier', modifier);
app.use('/exercisetype', exerciseType);
app.use('/muscle', muscle);
app.use('/exercise', exercise);

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
