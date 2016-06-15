"use strict"
const _bsConnKey = Symbol();
const Q = require('q');
const bsCollName = 'BodySections';
const bsCollFriendlyName = 'Body Section';
const PersonnaDao = require('../dao/personnaDao').PersonnaDao;

class BodySectionService {
  constructor(db) {
    this[_bsConnKey] = new PersonnaDao(db, bsCollName, bsCollFriendlyName);
  }

  addBodySection(section) {
    var deferred = Q.defer();
    this[_bsConnKey].addItem(section, (result) => {
      if (result.getSuccess()) {
        deferred.resolve(result);
      } else {
        deferred.reject(result);
      }
    });
    return deferred.promise;
  }
}