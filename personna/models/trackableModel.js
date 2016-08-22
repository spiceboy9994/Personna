/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
let _titleKey = Symbol();
class TrackableModel {
  constructor(_title) {
    this[_titleKey] = _title;
  }

  getTitle() {
    return this[_titleKey];
  }

  setTitle(value) {
    this[_titleKey] = value;
  }
}

module.exports.TrackableModel = TrackableModel;