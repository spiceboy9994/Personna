"use strict"
const express               = require('express'),
      router                = express.Router();
/**
 * Adds an  Muscle
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  const bodySectionProxy = req.app.get("services").BodySection;
  const muscleProxy = req.app.get("services").Muscle;
  const modifierProxy = req.app.get("services").Modifier;
  const logger = req.app.get("customLogger");
  let sectionJson = null;
  let modifierJson = null;
  let muscle = {
    name: req.body.name,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    imageInBodyUrl: req.body.imageInBodyUrl,
    createdBy: 1, // TODO: use session user
    createdOn: new Date(),
  };
  // find the body section
  bodySectionProxy.getById(req.body.bodySectionId)
  .then((sectionResult) => {
    sectionJson = sectionResult.toJSON();
    // add the muscle if the result is correct
    if(sectionJson.success) {
      return modifierProxy.getByMultiplesIds(req.body.modifierIds.split(','));
    } else {
      // item should be error, throw it
      throw(sectionJson.item);
    }
  })
  .then((modifierResult) => {
    // Get modifiers
    modifierJson = modifierResult.toJSON();
    if (modifierJson.success) {
      // Save the muscle
      return muscleProxy.addMuscle(muscle, sectionJson.item, modifierJson.item);
    } else {
      throw(modifierJson.item);
    }
  })
  .then((muscleResult) => {
    let muscleJson = muscleResult.toJSON();
   
    res.json(muscleJson);
  })
  .fail((err) => {
    // log the error
    logger.logError(err);
    // and return it
    res.json(err.message);
  })
  .done();
});

/**
 * Gets the list of all muscles
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             var result [description]
 * @return {[type]}         [description]
 */
router.get('/', function(req, res, next) {
  const muscleProxy = req.app.get("services").Muscle;
  // console.log (muscleProxy)
  const logger = req.app.get("customLogger");
  var result = muscleProxy.getMuscles({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    // log the error
    logger.logError(err.message);
    // and return it
    res.json(err.message);
  })
});

/**
 * Updates a muscle
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             const muscleProxy [description]
 * @return {[type]}         [description]
 */
router.patch('/:muscleId', function(req, res, next) {
  const muscleProxy = req.app.get("services").Muscle;
  const modifierProxy = req.app.get("services").Modifier;
  const muscleId = req.params.muscleId;
  let modifierJson = null;
  let modifierPromise  = null;
  // set the base props to modify
  let muscle = {
    id: muscleId,
    name: req.body.name,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    imageInBodyUrl: req.body.imageInBodyUrl,
    modifiedBy: 1, // TODO: use session user
    modifiedOn: new Date(),
  }
  if (req.body.modifierIds) {
    modifierPromise = modifierProxy.getByMultiplesIds(req.body.modifierIds.split(','));
  } else {
    modifierPromise = modifierProxy.emptyPromise();
  }
  modifierPromise
  .then((modifierResult) => {
    modifierJson = modifierResult.toJSON();
    if (modifierJson.success) {
      // Save the muscle
      return muscleProxy.updateMuscle(muscle, modifierJson.item);
    } else {
      throw(modifierJson.item);
    }
  })
  .then((muscleResult) => {
    let muscleJson = muscleResult.toJSON();
    res.json(muscleJson);
  })
  .fail((err) => {
    // log the error
    logger.logError(err);
    // and return it
    res.json(err.message);
  })
  .done();
})
module.exports = router;