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
  console.log(app);
  console.log(app.locals.db);
  console.log(req.db);
  const bodyService = new BodySectionService(app.locals.db);
  bodySectionService.addBodySection(bodySection).then((result) => {
    res.json(bodySection);
  })
  .fail((err) => {
    res.json(err);
  })
});

module.exports = router;