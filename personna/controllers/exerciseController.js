"use strict"
const express             = require('express'),
      router              = express.Router(),
      _                   = require('lodash');

/**
 * Adds an  Exercise item
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  const exerciseProxy = req.app.get('services').Exercise;
  const exerciseTypeProxy = req.app.get('services').ExerciseType;
  const logger = req.app.get('customLogger');
  let eTypeJson = null;
  let eTypePromise  = null;
  const exercise = {
    name: req.body.name,
    description: req.body.description,
    createdBy: 1, // TODO: use session user
    createdOn: new Date(),
  };
 
  // sort the objects by id
  let sortedTypes = _.orderBy(req.body.exerciseTypes, ["id"], ["asc"]);
  exerciseTypeProxy.getByMultiplesIds(sortedTypes)
  .then((etypesResult) => {
    eTypeJson = etypesResult.toJSON();
    // add the exercise if the result is correct
    if(eTypeJson.success) {
      return exerciseProxy.addExercise(exercise, eTypeJson.item);
    } else {
      // item should be error, throw it
      throw(eTypeJson.item);
    }
  })
  .then((result) => {
    res.json(result.toJSON());
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
});

/**
 * Updates an Exercise
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             const exerciseProxy [description]
 * @return {[type]}         [description]
 */
router.patch('/:exerciseId', function(req, res, next) {
  const exerciseProxy = req.app.get('services').Exercise;
  const exerciseTypeProxy = req.app.get('services').ExerciseType;
  const logger = req.app.get('customLogger');
  const exerciseId = req.params.exerciseId;
  let eTypeJson = null;
  let eTypePromise = null;
  const exercise = {
    id: exerciseId,
    name: req.body.name,
    description: req.body.description,
    modifiedBy: 1, // TODO: use session user
    modifiedOn: new Date(),
  };
  if (req.body.exerciseTypes) {
    // sort the objects by id
    let sortedTypes = _.orderBy(req.body.exerciseTypes, ["id"], ["asc"]);
    eTypePromise = exerciseTypeProxy.getByMultiplesIds(sortedTypes);
  } else {
    eTypePromise = exerciseTypeProxy.emptyPromise();
  }
  eTypePromise
  .then((etypesResult) => {
    eTypeJson = etypesResult.toJSON();
    // add the exercise if the result is correct
    if(eTypeJson.success) {
      return exerciseProxy.updateExercise(exercise, eTypeJson.item);
    } else {
      // item should be error, throw it
      throw(eTypeJson.item);
    }
  })
  .then((result) => {
    res.json(result.toJSON());
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
  
  
});

/**
 * Gets the list of all body Sections
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             var result [description]
 * @return {[type]}         [description]
 */
router.get('/', function(req, res, next) {
  const exerciseProxy = req.app.get('services').Exercise;
  const logger = req.app.get('customLogger');
  exerciseProxy.getExercises({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
});
module.exports = router;