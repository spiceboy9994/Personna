"use strict"
const express = require('express');
const router = express.Router();
const app = require('../app');
const BodySectionService = require('../services/bodySectionService').BodySectionService;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({success: true});
});

router.post('/', function(req, res, next) {
  const bodySection = { name: req.body.name };
   // var x = new BodySectionService();
   // console.log(x);
  // console.log(app.locals.db);
  // console.log('---> router post');
  // console.log(req.app.locals.dbConnection);
  const bodyService = new BodySectionService(req.app.locals.dbConnection);
  var result = bodyService.addBodySection(bodySection);
  res.json(result);
  // var result = bodyService.addBodySection(bodySection).then((result) => {
  //   res.json(bodySection);
  // })
  // .fail((err) => {
  //   res.json(err);
  // })
});

module.exports = router;