"use strict"
const express               = require('express'),
      router                = express.Router(),
      ExerciseTypeService   = require('../services/exerciseTypeService').ExerciseTypeService,
      exerciseTypeProxy     = new ExerciseTypeService();
/**
 * Adds a Exercise Type
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  let eType = {
    name: req.body.name,
    description: req.body.description,
    id: req.body.id
  };
  var result = exerciseTypeProxy.addExerciseType(eType).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});

/**
 * Gets the list of all Exercise Types
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             var result [description]
 * @return {[type]}         [description]
 */
router.get('/', function(req, res, next) {
  var result = exerciseTypeProxy.getExerciseTypes({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});
module.exports = router;