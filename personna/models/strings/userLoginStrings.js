/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const util = require("util");

const _bsMessageKey  = Symbol();
/**
 * Contains all messages for Entity Crud operations
 */
class LoginStrings {
  static Messages(parameter) {
    return {
      USER_NOT_FOUND: util.format('Could not find user with Username %s', parameter),
      PASSWORD_INVALID: util.format('Password is invalid for user %s', parameter),
      NO_LONGER_ACTIVE: util.format('User %s is not longer active', parameter),
      MEMBERSHIP_HAS_EXPIRED: util.format('Membership for User %s has expired. Please renew your membership and try again', parameter),
      FACEBOOK_ERROR: 'Could not sign in user using Facebook. Please, try a regular account Login.'
    }
  }
}

module.exports.LoginStrings = LoginStrings;