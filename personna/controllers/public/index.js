/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
var express = require('express');
var RoutineModel = require('../../models/routineModel').RoutineModel;

//import { TrackableModel } from './trackableModel';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // initialize logger
  const perLogger = req.app.locals.personaLogger;
  var myModel =  new RoutineModel('david');
  myModel.setTitle('david');
  myModel.setUser('Espino');
  throw new Error('dummy');
  res.render('index', { title:  myModel.getTitle() + ' ' + myModel.getUser()  });
});

module.exports = router;
