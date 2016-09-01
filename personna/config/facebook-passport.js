/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
/**
 * Facebook passport config
 */
const LocalStrategy   = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
class FacebookPassport {
  constructor(config, passport) {
   
    let fbConfig = config.getFacebook();
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
        done(null, {id: id});
    });

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => { // callback with email and password from our form
       console.log(email);
       var dummyUser = {
           email: email,
           password: password,
       };
       return done(null, dummyUser);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        // User.findOne({ 'local.email' :  email }, function(err, user) {
        //     // if there are any errors, return the error before anything else
        //     if (err)
        //         return done(err);

        //     // if no user is found, return the message
        //     if (!user)
        //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        //     // if the user is found but the password is wrong
        //     if (!user.validPassword(password))
        //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        //     // all is well, return successful user
        //     return done(null, user);
        // });

    }));
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : fbConfig.clientId,
        clientSecret    : fbConfig.clientSecret,
        callbackURL     : fbConfig.callbackURL,
    },

    // facebook will send back the token and profile
    (token, refreshToken, profile, done) => {

        // asynchronous
        process.nextTick(function() {
          return done(null, profile);
            // find the user in the database based on their facebook id
            // User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

            //     // if there is an error, stop everything and return that
            //     // ie an error connecting to the database
            //     if (err)
            //         return done(err);

            //     // if the user is found, then log them in
            //     if (user) {
            //         return done(null, user); // user found, return that user
            //     } else {
            //         // if there is no user found with that facebook id, create them
            //         var newUser            = new User();

            //         // set all of the facebook information in our user model
            //         newUser.facebook.id    = profile.id; // set the users facebook id                   
            //         newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
            //         newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            //         newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            //         // save our user to the database
            //         newUser.save(function(err) {
            //             if (err)
            //                 throw err;

            //             // if successful, return the new user
            //             return done(null, newUser);
            //         });
            //     }

            // });
        });

    }));
  }
}
module.exports.FacebookPassport = FacebookPassport;