"use strict"
// Imports
const Q                 = require('q'),
      BodySectionModel  = require('../models/data/bodySectionModel').BodySectionModel,
      ResultModel       = require('../models/result/resultModel').ResultModel,
      strings           = require('../models/strings/crudStrings').CrudStrings;

// Symbols
const _bsConnKey = Symbol();

/**
 * Controls DB operations agaisnt the DB
 */
class BodySectionService {
  
  /**
   * Adds a Body Section to the DB
   * @param {object} section Body Section
   */
  static addBodySection(section) {
    let deferred = Q.defer();
    let bodySectionInstance = new BodySectionModel();
    let bodySection = bodySectionInstance.getModel();
    bodySection.Name = section.name;
    bodySection.BodySectionId = section.id;
    bodySection.save((err) => {
      let resultModel = null;
      if (err) {
        resultModel = new ResultModel(err, false, strings.Messages(bodySectionInstance.getSchemaName()).COULD_NOT_SAVE);
        deferred.reject(resultModel);
      } else {
        resultModel = new ResultModel(bodySection, true, strings.Messages(bodySectionInstance.getSchemaName()).ADDED);
        deferred.resolve(resultModel);
      }
    }); 
    return deferred.promise;
  }
}

module.exports.BodySectionService = BodySectionService;