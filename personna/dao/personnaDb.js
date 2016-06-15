"use strict"
const MongoClient = require('mongodb').MongoClient;
let _connKey = Symbol();
class PersonnaDb {
  constructor(dbUrl) {
    MongoClient.connect(dbUrl, function(err, db) {
      if (err) {
        throw err;
      } else {
        this[_connKey] = db;
      }
    });
  }

  getConnection() {
    return this[_connKey];
  } 
}