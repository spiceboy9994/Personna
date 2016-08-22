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
  const equipmentproxy = req.app.get("services").Equipment;
  const logger = req.app.get("customLogger");
  let equipment = {
    name: req.body.name,
    id: req.body.id,
    description: req.body.description,
  };
  var result = equipmentproxy.addEquipment(equipment).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err.message);
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
  const equipmentproxy = req.app.get("services").Equipment;
  const logger = req.app.get("customLogger");
  var result = equipmentproxy.getEquipments({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err.message);
  })
  .done();
});
module.exports = router;