"use strict"
const express             = require('express'),
      router              = express.Router(),
      BodySectionService  = require('../services/bodySectionService').BodySectionService,
      bodySectionProxy    = new BodySectionService();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.json({success: true});
// });

/**
 * Adds a body Section
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next) {             let section [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  let section = {
    name: req.body.name,
    id: req.body.id
  };
  var result = bodySectionProxy.addBodySection(section).then((result) => {
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
  var result = bodySectionProxy.getBodySections({}).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});
module.exports = router;