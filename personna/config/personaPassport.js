/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
/**
 * Facebook passport config
 */
const LocalStrategy         = require('passport-local').Strategy,
      FacebookStrategy      = require('passport-facebook').Strategy,
      util                  = require('util'),
      randomstring          = require('randomstring'),
      userStrings           = require('./../models/strings/userLoginStrings').LoginStrings;
class PersonaPassport {
  constructor(config, passport) {
   
    let fbConfig = config.getFacebook();
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        let serializableUser = {
            id: user._id,
            userId: user.UserId,
            email: user.Email,
            userName: user.UserName,
            firstName: user.FirstName,
            lastName: user.LastName,
            memberships: [],
        };
        if (user.UserMemberShips) {
            // console.log('--> member data');
            // console.log(user.UserMemberShips, util.inspect(user.UserMemberShips, {depth: null, showHidden: false}));
            // user.UserMemberShips.forEach((membership) => {
            let membership = user.UserMemberShips;
            let memberData = user.MembershipData[0];
            serializableUser.memberships.push({
                name: memberData.Name,
                id: membership.MembershipType,
                isActive: membership.IsActive,
                canAlterRoutines: memberData.CanAlterRoutines,
                canCreateRoutines: memberData.CanCreateRoutines,
                canAddExercises: memberData.CanAddExercises,
                canHaveTracking: memberData.CanHaveTracking,
                canHaveSocial: memberData.CanHaveSocial,
                canQueryCatalogs: memberData.CanQueryCatalogs,
                canAlterUsers: memberData.CanAlterUsers,
                isAdmin: memberData.IsAdmin,
            });
        }
        done(null, serializableUser);
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
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, (req, username, password, done) => { // callback with email and password from our form
        const userProxy = req.app.get("services").User;
        const mTypeProxy = req.app.get("services").MembershipType;
        let userToLogin = {
            userName: username.toLowerCase(),
            password: password
        };

        userProxy.loginUser(userToLogin)
        .then((userResult) => {
            let userJson = userResult.toJSON();
            return done(null, userJson.item);
        })
        .fail((err) => {
            let userJson = err.toJSON();
            return done(null, false, req.flash('loginMessage', userJson.message));
        })
        .done();
    }));
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy(
        {
            // pull in our app id and secret from our auth.js file
            passReqToCallback: true,
            clientID        : fbConfig.clientId,
            clientSecret    : fbConfig.clientSecret,
            callbackURL     : fbConfig.callbackURL,
            profileFields: ['id', 'email', 'gender', 'locale', 'name', 'age_range', 'birthday', 'picture'],
        },

        // facebook will send back the token and profile
        (req, token, refreshToken, profile, done) => {
            // asynchronous fb profile
            process.nextTick(function() {
                const facebookError = userStrings.Messages().FACEBOOK_ERROR;
                const userProxy = req.app.get("services").User;
                const membershipProxy = req.app.get("services").MembershipType;
                // find the user in the database based on their facebook id
                userProxy.getUsers({FacebookId: profile.id})
                .then((userResult) => {
                    let userJson = userResult.toJSON();
                    if (!userJson.success) {
                        return done(null, false, req.flash('loginMessage', facebookError));
                    } else {
                        // user found, resolve with it
                        if (userJson.item.length > 0) {
                            return done(null, userJson.item[0]); // user found, return that user
                        } else {
                            // user not found, create a new one
                            var newUser = {};
                            newUser.facebookId    = profile.id; // set the users facebook id  
                            newUser.facebookToken = token;
                            newUser.email =  profile.emails[0].value;             
                            newUser.userName = newUser.email;
                            if (profile.name) {
                                newUser.firstName = profile.name.givenName || '';
                                newUser.lastName = profile.name.familyName || '';
                            }
                            newUser.createdBy = 1; // TODO: default admin user,
                            newUser.createOn = new Date();
                            newUser.password = randomstring.generate(8);
                            // default membership
                            membershipProxy.getDefaultMembership()
                            .then((memberResult) => {
                                let memberJson = memberResult.toJSON();
                                if(memberJson.success) {
                                    // add the user
                                    return userProxy.addUser(newUser, memberJson.item[0]);
                                } else {
                                    // item should be error, throw it
                                    return userProxy.emptyPromise(memberJson.item);
                                }
                            })
                            .then((userResult) => {
                                // after saving get the complete user object
                                let userJson = userResult.toJSON();
                                return  userProxy.getUsers({_id: userJson.item._id})
                            })
                            .then((savedUserResult) => {
                                // and serialize it
                                let savedResultJson = savedUserResult.toJSON();
                                if (!savedResultJson.success) {
                                    return done(userResult.item);
                                } else {
                                    return done(null, userJson.item);
                                }
                            })
                            .fail((err) => {
                                return done(null, false, req.flash('loginMessage', facebookError));
                            })
                            .done();
                        }
                    }
                })
                .fail((err) => {
                    return done(null, false, req.flash('loginMessage', facebookError));
                }) 
                .done();
            });
        }));
  }
}
module.exports.PersonaPassport = PersonaPassport;