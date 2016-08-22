/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const express             = require('express'),
      router              = express.Router();

/**
 * Adds an  Equipment piece
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  const modifierProxy = req.app.get("services").Modifier;
  const logger = req.app.get("customLogger");
  let equipment = {
    name: req.body.name,
    id: req.body.id,
    description: req.body.description,
  };
  var result = modifierProxy.addModifier(equipment).then((result) => {
    res.json(result);
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
  const modifierProxy = req.app.get("services").Modifier;
  const logger = req.app.get("customLogger");
  var result = modifierProxy.getModifiers({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
});
module.exports = router;