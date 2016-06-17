"use strict"
const express = require('express');
const router = express.Router();
const app = require('../app');
const BodySectionService = require('../services/bodySectionService').BodySectionService;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({success: true});
});

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
  var result = BodySectionService.addBodySection(section).then((result) => {
    res.json(result);
  })
  .fail((err) => {
    res.json(err);
  })
});

module.exports = router;