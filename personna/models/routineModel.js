/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
let _userKey = Symbol();
var TrackableModel = require('./trackableModel').TrackableModel;
class RoutineModel extends TrackableModel {
 
  getUser() {
    return this[_userKey];
  }

  setUser(value) {
    this[_userKey] = value;
  }
}

module.exports.RoutineModel = RoutineModel;