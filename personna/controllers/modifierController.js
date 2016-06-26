"use strict"
const express             = require('express'),
      router              = express.Router(),
      ModifierService    = require('../services/modifierService').ModifierService,
      modifierProxy      = new ModifierService();


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
  var result = modifierProxy.addModifier(equipment).then((result) => {
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
  var result = modifierProxy.getModifiers({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});
module.exports = router;