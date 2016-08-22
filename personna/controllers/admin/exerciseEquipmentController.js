/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const express             = require('express'),
      router              = express.Router(),
      _                   = require('lodash');

/**
 * Adds an  Exercise Equipment item
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  const exerciseEquipProxy = req.app.get('services').ExerciseEquipment;
  const exerciseProxy = req.app.get('services').Exercise;
  const equipmentProxy = req.app.get('services').Equipment;
  const logger = req.app.get('customLogger');
  let exJson = null;
  let equipJson  = null;
  let saveJson = null;
  const exercise = {
    description: req.body.description,
    notes: req.body.notes || [],
    animationUrl: req.body.animationUrl,
    videoUrl: req.body.videoUrl,
    createdBy: 1, // TODO: use session user
    createdOn: new Date(),
  };
  let exerciseId = req.body.exerciseId;
  // get the exercise
  exerciseProxy.getById(exerciseId).then((exerciseResult) => {
    exJson = exerciseResult.toJSON();
    if (exJson.success) {
      // now get the equipment
      return equipmentProxy.getByMultiplesIds(req.body.equipmentIds.split(','));
    } else {
      // item should be error, throw it
      throw(exJson.item);
    }
  })
  .then((equipmentResult) => {
    equipJson = equipmentResult.toJSON();
    if (equipJson.success) {
      // now save the exercise equipment
      return exerciseEquipProxy.addExerciseEquipment(exercise, exJson.item, equipJson.item);
    } else {
      // item should be error, throw it
      throw(equipJson.item);
    }
  })
  .then((saveResult) => {
    saveJson = saveResult.toJSON();
    if (saveJson.success) {
      // now save the exercise equipment
      res.json(saveJson.item);
    } else {
      // item should be error, throw it
      throw(saveJson.item);
    }
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
});

/**
 * Updates an Exercise Equipment item
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             const exerciseProxy [description]
 * @return {[type]}         [description]
 */
router.patch('/:exEquipId', function(req, res, next) {
  const exerciseEquipProxy = req.app.get('services').ExerciseEquipment;
  const equipmentProxy = req.app.get('services').Equipment;
  const logger = req.app.get('customLogger');
  let equipPromise = null;
  let equipJson  = null;
  let saveJson = null;
  const exercise = {
    id: req.params.exEquipId,
    description: req.body.description,
    animationUrl: req.body.animationUrl,
    videoUrl: req.body.videoUrl,
    notes: req.body.notes || [],
    modifiedBy: 1, // TODO: use session user
    modifiedOn: new Date(),
  };
  // get the equipments
  if (req.body.equipmentIds) {
    equipPromise = equipmentProxy.getByMultiplesIds(req.body.equipmentIds.split(','));
  } else {
    equipPromise = equipmentProxy.emptyPromise();
  }
  equipPromise
  .then((equipResult) => {
    equipJson = equipResult.toJSON();
    console.log('--> EQUIP json');
    console.log(equipJson);
    if (equipJson.success) {
      return exerciseEquipProxy.updateExerciseEquipment(exercise, equipJson.item);
    } else {
      // item should be error, throw it
      throw(equipJson.item);
    }
  })
  .then((exSaveResult) => {
    saveJson = exSaveResult.toJSON();
    if (saveJson.success) {
      // now save the exercise equipment
      res.json(saveJson.item);
    } else {
      // item should be error, throw it
      throw(saveJson.item);
    }
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
});

/**
 * Gets the list of all Exercise Equipment
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             var result [description]
 * @return {[type]}         [description]
 */
router.get('/', function(req, res, next) {
  const exerciseEquipProxy = req.app.get('services').ExerciseEquipment;
  const logger = req.app.get('customLogger');
  exerciseEquipProxy.getExerciseEquipments({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
});

/**
 * Gets all exercise equipment items based on query sent to the server
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {}          [description]
 * @return {[type]}       [description]
 */
router.get('/filtered', function(req, res, next) {
  let exerciseIds = [];
  let equipmentIds = [];
  let muscleIds = [];
  let exerciseTypeIds = [];
  let bodySectionIds = [];
  // check what params are present
  if (req.query.exIds) {
    exerciseIds = req.query.exIds.split(',');
  }
  if (req.query.eqIds) {
    equipmentIds = req.query.eqIds.split(',');
  }
  
  if (req.query.mIds) {
    muscleIds = req.query.mIds.split(',');
  }

  if (req.query.eTids) {
    exerciseTypeIds = req.query.eTids.split(',');
  }

  if (req.query.bsIds) {
    bodySectionIds = req.query.bsIds.split(',');
  }

  const exerciseEquipProxy = req.app.get('services').ExerciseEquipment;
  const logger = req.app.get('customLogger');

  let query = exerciseEquipProxy.getFilteredQuery(exerciseIds, equipmentIds, muscleIds, exerciseTypeIds, bodySectionIds);
  exerciseEquipProxy.getExerciseEquipments(query).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();


});
module.exports = router;
