var express = require('express');
var RoutineModel = require('../models/routineModel').RoutineModel;

//import { TrackableModel } from './trackableModel';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var myModel =  new RoutineModel('david');
  myModel.setTitle('david');
  myModel.setUser('Espino');
  res.render('index', { title:  myModel.getTitle() + ' ' + myModel.getUser()  });
});

module.exports = router;
