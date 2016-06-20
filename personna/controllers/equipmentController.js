"use strict"
const express             = require('express'),
      router              = express.Router(),
      EquipmentService    = require('../services/equipmentService').EquipmentService,
      equipmentproxy      = new EquipmentService();


/**
 * Adds an  Equipment piece
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  let equipment = {
    name: req.body.name,
    id: req.body.id,
    description: req.body.description,
  };
  var result = equipmentproxy.addEquipment(equipment).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});

/**
 * Gets the list of all body Sections
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {             var result [description]
 * @return {[type]}         [description]
 */
router.get('/', function(req, res, next) {
  var result = equipmentproxy.getEquipments({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});
module.exports = router;