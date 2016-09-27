/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
/**
 * Controls Results preparation for client
 */
const ResultModel = require('../models/result/resultModel').ResultModel,
      Q           = require('Q'),
      mongoose    = require('mongoose'),
      strings     = require('../models/strings/crudStrings').CrudStrings;

const _modelInstance =  Symbol();
const _modelName = Symbol();

class BaseService {


  constructor (model) {
    this[_modelInstance] = model;
    this[_modelName] = model.getSchemaName();
  }
  /**
   * Prepares all results from the application
   * @param  {[type]} deferred       [description]
   * @param  {[type]} successMessage [description]
   * @param  {[type]} successData    [description]
   * @param  {[type]} errorMessage   [description]
   * @param  {[type]} errorData      [description]
   * @return {[type]}                [description]
   */
  static prepareResult(deferred, successMessage, successData, errorMessage, errorData) {
    let resultModel = null;
    if (errorData) {   
      resultModel = new ResultModel(errorData, false, errorMessage);
      return deferred.reject(resultModel);
    } else {
      resultModel = new ResultModel(successData, true, successMessage);
      // console.log(resultModel.toJSON());
      return deferred.resolve(resultModel);
    }
  }

  /**
   * Returns an empty promise
   * @return {[type]} [description]
   */
  emptyPromise() {
    let deferred = Q.defer();
    console.log('in empyt promise');
    let emptyResult =  new ResultModel({}, true, '');; 
    deferred.resolve(emptyResult);
    return deferred.promise;
  }

  /**
   * Converts a list of ids to list of mongoose document id
   * @param  {[type]} ids [description]
   * @return {[type]}     [description]
   */
  static idsToMongoose(ids) {
    let idArray = [];
    ids.forEach((id) => {
      idArray.push(mongoose.Types.ObjectId(id))
    });
    return idArray;
  }

  /** transforms an id to mongoose id */
  idToMongooseId(id) {
    return  mongoose.Types.ObjectId(id);
  }

  static queryById(id) {
    let query = { '_id':  mongoose.Types.ObjectId(id)  }; 
    return query;
  }

  /**
   * Exposes the possible strings
   * @return {[type]} [description]
   */
  messages() {
    return strings.Messages(this[_modelName]);
  }

  /** Exposes unique messages */
  uniqueMessages(field, value) 
  {
    return strings.Messages(this[_modelName], field, value);
  }

  /**
   * Exposes the model instance
   * @return {[type]} [description]
   */
  modelInstance() {
    return this[_modelInstance];
  }

}

module.exports.BaseService = BaseService;