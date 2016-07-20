"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('./baseService').BaseService;

/**
 * Controls Body Section DB operations agaisnt the DB
 */
class BodySectionService extends BaseService {
  
  constructor(db) {
    super(db.dataModels().BodySection);
  }
  /**
   * Adds a Body Section to the DB
   * @param {object} section Body Section
   */
  addBodySection(section) {
    let deferred = Q.defer();
    let bodySectionInstance = super.modelInstance();
    let bodySection = bodySectionInstance.getModel();
    bodySection.Name = section.name;
    bodySection.BodySectionId = section.id;
    bodySection.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      BodySectionService.prepareResult(deferred, successMessage, bodySection, errorMessage, err);
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
    let bodySectionInstance = super.modelInstance();
    let bodySection = bodySectionInstance.getModelList();
    bodySection.find(query, (err, sections) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      BodySectionService.prepareResult(deferred, successMessage, sections, errorMessage, err);
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
    let bodySectionInstance = super.modelInstance();
    let bodySection = bodySectionInstance.getModelList();
    bodySection.findById(id, (err, section) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, section, errorMessage, err);
    });
    return deferred.promise;
  }

}

module.exports.BodySectionService = BodySectionService;