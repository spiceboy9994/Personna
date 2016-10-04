/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
/**
* Controls required authentication for determined endpoints
*/
let securityMiddle = {};

/**
 * Validates the user has enough permissions before serving the response
 */
securityMiddle.validatePermissions = (requiredPermissions) => {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      // console.log('-- current user');
      // console.log(req.method);
      var userPermissions = req.user.id.memberships;
      //  console.log(userPermissions);
      let hasEnoughPermissions = true;
      userPermissions.every((userPerm, index) => {
        if (userPerm.isActive) {
          //  get required permission based on the action
          let reqPermissionAction = requiredPermissions[req.method];
          let reqPermKeys = Object.keys(reqPermissionAction);
          reqPermKeys.every((perm, index) => {
            hasEnoughPermissions = userPerm[perm]
            if (hasEnoughPermissions) {
              return false;
            }
          });
        } else {
          hasEnoughPermissions = false;
        }
        // if at least one membership grants access, then continue;
        if (hasEnoughPermissions) {
          return false;
        }
      })
      if (hasEnoughPermissions) {
        return next();
      } else {
        res.status(401).json({message: "Not enough permissions"});
      }
    } else {
      res.redirect('/user/login');
    }
  }
}

/**
 * Validates the user is authenticated before responding
 */
securityMiddle.isUserAuthenticated = (authRoutes) => {
  return function (req, res, next) {
    let actualRoute = req.url;
    if (authRoutes[actualRoute]) {
      // this means that route is protected
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/user/login');
      }
    } else {
      next();
    }
  }
}

module.exports = securityMiddle;