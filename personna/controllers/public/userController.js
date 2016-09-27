/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const express = require('express'),
      router = express.Router();

let globalPassport = null;
let getPassport = (req, res, next) => {
  globalPassport = req.app.get('authPassport');
  return next();
}

/* GET users listing. */
  router.get('/', function(req, res, next) {
    const userProxy = req.app.get("services").User;
    const logger = req.app.get("customLogger");
    userProxy.getUsers({}).then((userResult) => {
      var userJson = userResult.toJSON();
      return res.status(200).json(userJson);
    })
    .fail((err) => {
      logger.logError(err);
      res.json(err);
    })
    .done();
  });

/**
 * Renders the login view
 */
router.get('/login', (req, res, next) => {
  var errorMessage = req.flash().loginMessage;
  res.status(200).render('login', { loginMessage: errorMessage? errorMessage[0] : null });
});

/** Handles new user creation */
router.post('/', (req, res, next) => {
  let body = req.body;
  const membershipProxy = req.app.get("services").MembershipType;
  const userProxy = req.app.get("services").User;
  const logger = req.app.get("customLogger");
  let user = {
    userName: body.userName,
    password: body.password,
    firstName: body.firstName || '',
    lastName: body.lastName || '',
    email: body.email || '',
    createdBy: 1, // TODO: default admin user,
    createOn: new Date(),
  }
  // check if membership Type is defined, otherwise, get the default one
  let membershipPromise = null;
  if (body.membership) {
    membershipPromise = membershipProxy.getById(body.membership);
  } else {
    membershipPromise = membershipProxy.getDefaultMembership();
  }
  membershipPromise.then((memberResult) => {
    let memberJson = memberResult.toJSON();
    if(memberJson.success) {
      return userProxy.addUser(user, memberJson.item);
    } else {
      // item should be error, throw it
      throw(memberJson.item);
    }
  })
  .then((userResult) => {
    let userJson = userResult.toJSON();
    res.json(userJson);
  })
  .fail((err) => {
    logger.logError(err);
    res.json(err);
  })
  .done();
})

/**
 * Handles the Initial request for fb authentication
 */
router.get('/auth/facebook', (req, res, next) => {
  globalPassport = req.app.get('authPassport');
  globalPassport.authenticate('facebook', { scope : 'email,public_profile,user_friends' })(req, res, next);
});

/**
 * Handles the the facebook call back url
 */
router.get('/auth/facebook/callback', (req, res, next) => { 
  globalPassport = req.app.get('authPassport');
  globalPassport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/user/login'
  })(req, res, next);
});

/**
 * Handles the regular login form
 */
router.post('/login', (req, res, next) => {
  var passport = req.app.get('authPassport');
  passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/user/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  })(req, res, next);;
});


module.exports = router;