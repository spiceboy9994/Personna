"use strict"
// Imports
const Q                 = require('q'),
      BodySectionModel  = require('../models/data/bodySectionModel').BodySectionModel,
      // ResultModel       = require('../models/result/resultModel').ResultModel,
      BaseService       = require('./baseService').BaseService,
      strings           = require('../models/strings/crudStrings').CrudStrings;

const _bsInstance =  Symbol();

/**
 * Controls Body Section DB operations agaisnt the DB
 */
class BodySectionService {
  
  constructor() {
    this[_bsInstance] = new BodySectionModel();
  }
  /**
   * Adds a Body Section to the DB
   * @param {object} section Body Section
   */
  static addBodySection(section) {
    let deferred = Q.defer();
    let bodySectionInstance = this[_bsInstance];
    let bodySection = bodySectionInstance.getModel();
    bodySection.Name = section.name;
    bodySection.BodySectionId = section.id;
    bodySection.save((err) => {
      const successMessage = strings.Messages(bodySectionInstance.getSchemaName()).ADDED;
      const errorMessage = strings.Messages(bodySectionInstance.getSchemaName()).COULD_NOT_SAVE;
      BaseService.prepareResult(deferred, successMessage, bodySection, errorMessage, err);
    }); 
    return deferred.promise;
  }

  /**
   * Gets the list of body sections
   * @param  {[type]} query [description]
   * @return {[type]}       [description]
   */
  static getBodySections(query) {
    let deferred = Q.defer();
    let bodySectionInstance = this[_bsInstance];
    let bodySection = bodySectionInstance.getModelList();
    bodySection.find(query, (err, sections) => {
      const successMessage = '';
      const errorMessage = strings.Messages(bodySectionInstance.getSchemaName()).COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, sections, errorMessage, err);
    });
    return deferred.promise;
  }

}

module.exports.BodySectionService = BodySectionService;