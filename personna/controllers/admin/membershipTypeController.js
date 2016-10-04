/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const express             = require('express'),
      router              = express.Router();
/**
 * Adds a membership type
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  const mTypeProxy = req.app.get("services").MembershipType;
  const logger = req.app.get("customLogger");
  const body = req.body;
  let mType = {
    name: body.name,
    description: body.description,
    canCreateRoutines: body.canCreateRoutines,
    canAddExercises: body.canAddExercises,
    canHaveTracking: body.canHaveTracking,
    canHaveSocial: body.canHaveSocial,
    canAlterRoutines: body.canAlterRoutines,
    canQueryCatalogs: body.canQueryCatalogs,
    isPurchasable: body.isPurchasable,
    isAdmin: body.isAdmin || false,
    isActive: true,
  };
  var result = mTypeProxy.addMembershipType(mType).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err.message);
  })
  .done();
});

/**
 * Gets all Membership Types
 */
router.get('/', function(req, res, next) {
  const mTypeProxy = req.app.get("services").MembershipType;
  const logger = req.app.get("customLogger");
  var result = mTypeProxy.getMembershipTypes({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err.message);
  })
  .done();
})

module.exports = router;