"use strict"
// Imports
const Q                     = require('q'),
      BaseService       = require('./baseService').BaseService,
      strings           = require('../models/strings/crudStrings').CrudStrings;

const _etInstance =  Symbol();

/**
 * Controls Exercise Type DB operations agaisnt the DB
 */
class ExerciseTypeService {

  constructor(db) {
    this[_etInstance] = db.dataModels().ExerciseType;
  }
   /**
   * Adds an Exercise Type  to the DB
   * @param {object} eType Exercise Type
   */
  addExerciseType(eType) {
    let deferred = Q.defer();
    let eTypeInstance = this[_etInstance];
    let eTypeModel = eTypeInstance.getModel();
    eTypeModel.Name = eType.name;
    eTypeModel.ExerciseTypeId = eType.id;
    eTypeModel.Description = eType.description;
    eTypeModel.save((err) => {
      const successMessage = strings.Messages(eTypeInstance.getSchemaName()).ADDED;
      const errorMessage = strings.Messages(eTypeInstance.getSchemaName()).COULD_NOT_SAVE;
      BaseService.prepareResult(deferred, successMessage, eTypeModel, errorMessage, err);
    }); 
    return deferred.promise;
  }

   /**
   * Get all Equipment from DB
   * @param {object} equipment
   */
  getExerciseTypes(query) {
    let deferred = Q.defer();
    let eTypeInstance = this[_etInstance];
    let eTypeModel = eTypeInstance.getModelList();
    eTypeModel.find(query, (err, eTypes) => {
      const successMessage = '';
      const errorMessage = strings.Messages(eTypeInstance.getSchemaName()).COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, eTypes, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.ExerciseTypeService = ExerciseTypeService;