"use strict"
const express               = require('express'),
      router                = express.Router();
/**
 * Adds a Exercise Type
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  const exerciseTypeProxy = req.app.get("services").ExerciseType;
  const logger = req.app.get("customLogger");
  let eType = {
    name: req.body.name,
    description: req.body.description,
    id: req.body.id
  };
  var result = exerciseTypeProxy.addExerciseType(eType).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err.message);
  })
  .done();
});

/**
 * Gets the list of all Exercise Types
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             var result [description]
 * @return {[type]}         [description]
 */
router.get('/', function(req, res, next) {
  const exerciseTypeProxy = req.app.get("services").ExerciseType;
  const logger = req.app.get("customLogger");
  var result = exerciseTypeProxy.getExerciseTypes({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err.message);
  })
  .done();
});
module.exports = router;