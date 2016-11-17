/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const express = require('express'),
      router = express.Router();

router.get('/google/callback', (req, res, next) => {
   let googleAuth = req.app.get('googleAuth');
   var code = req.query.code;
   googleAuth.storeTokenLocally(code)
   .then((authClient) => {
     console.log('---->resolved');
      //todo what was the original action... execute it
      res.redirect('/');
   })
   .fail((err) => {
     console.log(err);
   })
   .done();
});

router.get('/profile', (req, res, next) => {
  response.status(200).json({ success: true });
});


router.get('/', (req, res, next) => {
  let googleAuth = req.app.get('googleAuth');
  console.log('---object');
  console.log(googleAuth);
  googleAuth.authorizeLocal()
  .then((authClient) => {
    debugger;
    console.log('DONE');
    res.status(200).json('DONE');
  })
  .fail((err) => {
    // no local file was found, get the token
    let url = googleAuth.getNewTokenUrl();
    res.redirect(url);
  })
  .done();
})

module.exports = router;