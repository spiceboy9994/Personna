/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
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
    eTypeModel.Description = eType.description;
    eTypeModel.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
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
      const errorMessage = super.messages().COULD_NOT_GET;
      ExerciseTypeService.prepareResult(deferred, successMessage, eTypes, errorMessage, err);
    });
    return deferred.promise;
  }

  /**
   * Gets all the exercise types and adds the IsPrimary prop
   * @param  {[type]} eTypes [description]
   * @return {[type]}        [description]
   */
  getByMultiplesIds(eTypes) {
    let deferred = Q.defer();
    let eTypeInstance = super.modelInstance();
    let eTypeModel = eTypeInstance.getModelList()
    // get the ids
    let ids = [];
    eTypes.forEach((etype) => {
      ids.push(etype.id);
    });
    let idArray = ExerciseTypeService.idsToMongoose(ids);
    let query = {
      '_id': {
        $in: idArray
      }
    };
    eTypeModel.find(query).sort('_id').exec((err, dbETypes) => {
      if (!err && dbETypes.length) {       
        for (let i = 0; i < dbETypes.length; i++) {
          if (i < eTypes.length) {
            dbETypes[i].IsPrimary = eTypes[i].isPrimary;
          }
        }
      }
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      ExerciseTypeService.prepareResult(deferred, successMessage, dbETypes, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.ExerciseTypeService = ExerciseTypeService;