"use strict"
// const _bsConnKey = Symbol();
const Q = require('q');
// const bsCollName = 'BodySections';
// const bsCollFriendlyName = 'Body Section';
const PersonnaDb = require('../dao/personnaDb').PersonnaDb;

class BodySectionService {
  constructor() {
  }

  static addBodySection(section) {
    var deferred = Q.defer();
    
    const db = new PersonnaDb();
    db.openConnection().then((conn) => {
      console.log('In controller');
      console.log(section);
      deferred.resolve(section);
    })
    .fail((err) => {
      console.log(err);
      deferred.reject(err);
    })
    .done();

    return deferred.promise;
    return section;
  }
}

module.exports.BodySectionService = BodySectionService;