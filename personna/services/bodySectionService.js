"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('./baseService').BaseService,
      strings           = require('../models/strings/crudStrings').CrudStrings;

const _bsInstance =  Symbol();

/**
 * Controls Body Section DB operations agaisnt the DB
 */
class BodySectionService {
  
  constructor(db) {
    this[_bsInstance] =  db.dataModels().BodySection;
  }
  /**
   * Adds a Body Section to the DB
   * @param {object} section Body Section
   */
  addBodySection(section) {
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
  getBodySections(query) {
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

  /**
   * Gets a body Section by Id
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getById(id) {
    let deferred = Q.defer();
    let bodySectionInstance = this[_bsInstance];
    let bodySection = bodySectionInstance.getModelList();
    bodySection.findById(id, (err, section) => {
      const successMessage = '';
      const errorMessage = strings.Messages(bodySectionInstance.getSchemaName()).COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, section, errorMessage, err);
    });
    return deferred.promise;
  }

}

module.exports.BodySectionService = BodySectionService;