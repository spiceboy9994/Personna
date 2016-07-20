"use strict"
// Imports
const Q                     = require('q'),
      BaseService       = require('./baseService').BaseService;

/**
 * Controls Exercise Type DB operations agaisnt the DB
 */
class ExerciseTypeService extends BaseService {

  constructor(db) {
    super(db.dataModels().ExerciseType);
  }
   /**
   * Adds an Exercise Type  to the DB
   * @param {object} eType Exercise Type
   */
  addExerciseType(eType) {
    let deferred = Q.defer();
    let eTypeInstance = super.modelInstance();
    let eTypeModel = eTypeInstance.getModel();
    eTypeModel.Name = eType.name;
    eTypeModel.ExerciseTypeId = eType.id;
    eTypeModel.Description = eType.description;
    eTypeModel.save((err) => {
      const successMessage = strings.Messages(eTypeInstance.getSchemaName()).ADDED;
      const errorMessage = strings.Messages(eTypeInstance.getSchemaName()).COULD_NOT_SAVE;
      ExerciseTypeService.prepareResult(deferred, successMessage, eTypeModel, errorMessage, err);
    }); 
    return deferred.promise;
  }

   /**
   * Get all Equipment from DB
   * @param {object} equipment
   */
  getExerciseTypes(query) {
    let deferred = Q.defer();
    let eTypeInstance = super.modelInstance();
    let eTypeModel = eTypeInstance.getModelList();
    eTypeModel.find(query, (err, eTypes) => {
      const successMessage = '';
      const errorMessage = strings.Messages(eTypeInstance.getSchemaName()).COULD_NOT_GET;
      ExerciseTypeService.prepareResult(deferred, successMessage, eTypes, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.ExerciseTypeService = ExerciseTypeService;