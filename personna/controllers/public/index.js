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
  res.status(200).json({status: 'done'});
});

module.exports = router;
