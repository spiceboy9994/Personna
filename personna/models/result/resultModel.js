"use strict"
const _resultKey = Symbol();
const _resultSuccesKey = Symbol();
const _resultMessageKey = Symbol();
class ResultModel {
  constructor(item, success, message) {
   // if (arguments.length) {
      this[_resultKey] = item;
      this[_resultSuccesKey] = success;
      this[_resultMessageKey] = message;
    //}
  }

  // getResult() {
  //   return this[_resultKey];
  // }
  // setResult(value) {
  //   this[_resultKey] = value;
  // } 

  // getSuccess() {
  //   return this[_resultSuccesKey];
  // }
  // setSuccess(value) {
  //   this[_resultSuccesKey] = value;
  // }

  // getMessage() {
  //   return this[_resultMessageKey];
  // }
  // setMessage() {
  //   this[_resultMessageKey] = value;
  // }

  toJSON() {
    return {
      item:     this[_resultKey],
      success:  this[_resultSuccesKey],
      message:  this[_resultMessageKey]
    };
  }
}

module.exports.ResultModel = ResultModel;