"use strict"
/**
 * Controls Results preparation for client
 */
const ResultModel = require('../models/result/resultModel').ResultModel;

class BaseService {
  static prepareResult(deferred, successMessage, successData, errorMessage, errorData) {
    let resultModel = null;
    if (errorData) {   
      resultModel = new ResultModel(errorData, false, errorMessage);
      return deferred.reject(resultModel);
    } else {
      resultModel = new ResultModel(successData, true, successMessage);
      console.log(resultModel.toJSON());
      return deferred.resolve(resultModel);
    }
  }
}

module.exports.BaseService = BaseService;