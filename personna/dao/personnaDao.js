"use strict"
const _baseConnKey = Symbol();
const _collectionKey = Symbol();
const _friendlyCollNameKey = Symbol();
const ResultModel = require('../models/result/resultModel').ResultModel;
const util = require('util');
class PersonnaDao {
  constructor(db, collName, friendlyName) {
    this[_baseConnKey] = db;
    this[_collectionKey] = collName;
    this[_friendlyCollNameKey] = friendlyName;
  }

  addItem(item, callback) {  
    this[_baseConn].collection(this[_collectionKey]).insert(item, {ordered: true}, function(err, resultDoc) {
      const result = new ResultModel();
      if (err) {
        result.setSuccess(false);
        result.setMessage(util.format('%s cannot be saved', this[_friendlyCollNameKey]));
        result.setResult(err);
      } else {
        result.setSuccess(true);
        result.setMessage(util.format('%s saved succesfully', this[_friendlyCollNameKey]));
        result.setResult(resultDoc);
      }
      callback(result);
    });
  }

  getAllItems(callback) {
    this[_baseConn].collection(this[_collectionKey]).find(function(err, cursor) {
      const result = new ResultModel();
      if (err) {
        result.setSuccess(false);
        result.setMessage(util.format('%s cannot be retrieved', this[_friendlyCollNameKey]));
        result.setResult(err);
        callback(null, result);
      } else {
        result.setSuccess(true);
        result.setMessage('');
        cursor.toArray(callback(result));
      }
      
    })
  }
}