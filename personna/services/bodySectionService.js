"use strict"
const _bsConnKey = Symbol();
const Q = require('q');
// const bsCollName = 'BodySections';
// const bsCollFriendlyName = 'Body Section';
const PersonnaDb = require('../dao/personnaDb').PersonnaDb;

class BodySectionService {
  constructor(dbConn) {
    // console.log('---> constructor');
    // console.log(dbConn);
    this[_bsConnKey] = dbConn;
    // console.log(this[_bsConnKey]);
  }

  addBodySection(section) {
    // var deferred = Q.defer();
    console.log('---> in method');
    console.log(this[_bsConnKey]);
    // const db = new PersonnaDb();
    
      console.log('-> after method');
      console.log(section);
     
    return section;
  }
}

module.exports.BodySectionService = BodySectionService;