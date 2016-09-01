var express = require('express');
var router = express.Router();
var globalPassport = null;
var getPassport = (req, res, next) => {
  globalPassport = req.app.get('authPassport');
  return next();
}

/* GET users listing. */
  router.get('/', function(req, res, next) {
    res.status(200).send('respond with a resource');
  });

/**
 * Renders the login view
 */
router.get('/login', (req, res, next) => {
  res.status(200).render('login')
});

/**
 * Handles the Initial request for fb authentication
 */
router.get('/auth/facebook', (req, res, next) => {
  globalPassport = req.app.get('authPassport');
  globalPassport.authenticate('facebook', { scope : 'email' })(req, res, next);
});

/**
 * Handles the the facebook call back url
 */
router.get('/auth/facebook/callback', (req, res, next) => { 
  globalPassport = req.app.get('authPassport');
  globalPassport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/login'
  })(req, res, next);
});

/**
 * Handles the regular login form
 */
router.post('/login', (req, res, next) => {
  var passport = req.app.get('authPassport');
  passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  });
});


module.exports = router;