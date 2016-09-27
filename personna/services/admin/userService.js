/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('../baseService').BaseService,
      loginStrings      = require('../../models/strings/userLoginStrings').LoginStrings,
      bcrypt            = require('bcrypt'),
      mongoose          = require('mongoose');
const util  = require('util');
const userPopulateFilter = [
         { "$project": {
            _id: 1,
            UserName: 1,
            Email: 1,
            UserId: 1,
            FirstName: 1,
            LastName: 1,
            IsActive: 1,
            Password: 1,
            FacebookId: 1, 
            FacebookToken: 1,
            UserMemberShips: 1,
         }},
         { $unwind: '$UserMemberShips' },
         { $lookup: {from: 'membershiptypes', localField: 'UserMemberShips.MembershipType', foreignField: '_id', as: 'MembershipData'} },
      ];

/**
 * Controls User  DB operations agaisnt the DB
 */
class UserService extends BaseService {

  constructor(db) {
    super(db.dataModels().User);
  }

  /**
   * Gets the list of Users
   * @param  {[type]} query [description]
   * @return {[type]}       [description]
   */
  getUsers(query) {
    let deferred = Q.defer();
    let uInstance = super.modelInstance();
    let uModels = uInstance.getModelList();
    let populateFilter = userPopulateFilter.slice(0);
    if (query && Object.keys(query).length > 0) {
      populateFilter.push({ "$match": query });
    }
    uModels.aggregate(populateFilter, (err, users) => {
    // uModels.find(query, (err, users) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      UserService.prepareResult(deferred, successMessage, users, errorMessage, err);
    });
    return deferred.promise;
  }

  /**
   * Creates a Membership type to the db
   */
  addUser(user, mType) {
    let deferred = Q.defer();
    let uInstance = super.modelInstance();
    let uModel = uInstance.getModel();
    var  successMessage = super.messages().ADDED;
    var errorMessage = super.messages().COULD_NOT_SAVE;
    this.cryptPassword(user.password, (err, encPassword) => {
      if (err != null) {
        UserService.prepareResult(deferred, successMessage, uModel, errorMessage, err);
      } else {
        uModel.UserName = user.userName.toLowerCase();
        uModel.FirstName = user.firstName;
        uModel.LastName = user.lastName;
        uModel.Password = encPassword;
        uModel.Email = user.email;
        uModel.IsActive = true;
        uModel.CreatedBy = user.createdBy;
        uModel.CreatedOn = user.createdOn;
        uModel.FacebookId = user.facebookId || '';
        uModel.FacebookToken = user.facebookToken || '';
        // prepare the membership models
        let memberExpiresOn = new Date();
        memberExpiresOn.setDate(user.createOn.getDate() + 365); // TODO: get this from membership type
        uModel.UserMemberShips = 
        {
          ValidSince: user.createOn,
          ExpiresOn: memberExpiresOn,
          IsActive: true, 
          CreatedBy: user.createdBy,
          CreatedOn: user.createOn,
          MembershipType: mongoose.Types.ObjectId(mType._id),
        };
        let errorMessage = super.messages().COULD_NOT_SAVE;
        uModel.save((err) => {
          if (err && err.errors && err.errors.UserName) {
            // Error is in the username field, probably a unique constraint violation
            errorMessage = super.uniqueMessages('UserName', user.userName).NOT_UNIQUE;
          }
          const successMessage = super.messages().ADDED;
          UserService.prepareResult(deferred, successMessage, uModel, errorMessage, err);
        }); 
      }
    });
    
    return deferred.promise;
  }

  /** Logs a regular user to the system */
  loginUser(user) {
    let deferred = Q.defer();
    let uInstance = super.modelInstance();
    let uModels = uInstance.getModelList();
    var successMessage = '';
    var errorMessage = loginStrings.Messages(user.userName).USER_NOT_FOUND;
    let accessDeniedError = new Error('User not Found');
    // let populateFilter = [
    //      { "$match": { UserName : user.userName } },
    //      { "$project": {
    //         _id: 1,
    //         UserName: 1,
    //         Email: 1,
    //         UserId: 1,
    //         FirstName: 1,
    //         LastName: 1,
    //         IsActive: 1,
    //         Password: 1,
    //         FacebookId: 1, 
    //         FacebookToken: 1,
    //         UserMemberShips: 1,
    //      }},
    //      { $unwind: '$UserMemberShips' },
    //      { $lookup: {from: 'membershiptypes', localField: 'UserMemberShips.MembershipType', foreignField: '_id', as: 'MembershipData'} },
    //   ];
    let populateFilter = userPopulateFilter.slice(0);
    populateFilter.push({ "$match": { UserName : user.userName } });
    uModels.aggregate(populateFilter, (err, users) => {
      if (err || !users || users.length === 0) {
        UserService.prepareResult(deferred, successMessage, null, errorMessage, accessDeniedError);
      }
      else {
        let userFound = users[0];
        // compare the password with the hashed password
        bcrypt.compare(user.password, userFound.Password, (err, doesMatch) => {
          if (err) {
            UserService.prepareResult(deferred, successMessage, null, errorMessage, err);
          } else {
            if (doesMatch) {
              // user is still active?
              if (userFound.IsActive) {
                // log him in
                UserService.prepareResult(deferred, successMessage, userFound, errorMessage, err);
              } else {
                // user inactive, send error
                errorMessage = loginStrings.Messages(user.userName).NO_LONGER_ACTIVE;
                UserService.prepareResult(deferred, successMessage, userFound, errorMessage, accessDeniedError);
              }
            } else {
              // user found but pass do not match
              errorMessage = loginStrings.Messages(user.userName).PASSWORD_INVALID;
              UserService.prepareResult(deferred, successMessage, userFound, errorMessage, accessDeniedError);
            }
          }
        });
      }
    });
    return deferred.promise;
  }

  /**
   * Encriypts password for saving
   */
  cryptPassword(password, callback) {
      bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return callback(err);
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
          return callback(err, hash);
        });
      }

    });
  };

}

module.exports.UserService = UserService;