"use strict"
// Imports
const Q                     = require('q'),
      BaseService           = require('./baseService').BaseService,
      strings               = require('../models/strings/crudStrings').CrudStrings;

const _mInstance =  Symbol();

/**
 * Controls Exercise Type DB operations agaisnt the DB
 */
class MuscleService {

  constructor(db) {

    // var section =  db.dataModels().BodySection;
    this[_mInstance] = db.dataModels().Muscle;
  }
   /**
   * Adds an Exercise Type  to the DB
   * @param {object} eType Exercise Type
   */
  addMuscle(muscle, bodySection, modifiers) {
    console.log('--call add muscle good');
    let deferred = Q.defer();
    let mInstance = this[_mInstance];
    let mModel = mInstance.getModel();
    mModel.Name = muscle.name;
    mModel.Description = muscle.description;
    mModel.ShortDescription = muscle.shortDescription;
    mModel.ImageInBodyUrl = muscle.imageInBodyUrl,
    mModel.CreatedBy = muscle.createdBy,
    mModel.CreateOn = muscle.createdOn,
    mModel.BodySection = bodySection;
    modifiers.forEach((modifier) => {
      mModel.Modifiers.push(modifier);
    });
    mModel.save((err) => {
      console.log('after save');
      console.log(err);
      console.log(mModel);
      const successMessage = strings.Messages(mInstance.getSchemaName()).ADDED;
      const errorMessage = strings.Messages(mInstance.getSchemaName()).COULD_NOT_SAVE;
      BaseService.prepareResult(deferred, successMessage, mModel, errorMessage, err);
      console.log('--After all calls')
    }); 
    return deferred.promise;
  }

   /**
   * Get all Equipment from DB
   * @param {object} equipment
   */
  getMuscles(query) {
    let deferred = Q.defer();
    let mInstance = this[_mInstance];
    console.log('instance');
    console.log(mInstance.getModel());
    console.log(mInstance.getModelSchema())
    let mModel = mInstance.getModelList();
    mModel.find(query, (err, muscles) => {
      const successMessage = '';
      const errorMessage = strings.Messages(mInstance.getSchemaName()).COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, muscles, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.MuscleService = MuscleService;