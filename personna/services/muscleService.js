"use strict"
// Imports
const Q                     = require('q'),
      BaseService           = require('./baseService').BaseService;
/**
 * Controls Exercise Type DB operations agaisnt the DB
 */
class MuscleService extends BaseService {

  constructor(db) {
    super(db.dataModels().Muscle);
  }
   /**
   * Adds an Exercise Type  to the DB
   * @param {object} eType Exercise Type
   */
  addMuscle(muscle, bodySection, modifiers) {
    let deferred = Q.defer();
    let mInstance = super.modelInstance();
    // let mInstance = this[_mInstance];
    let mModel = mInstance.getModel();
    mModel.Name = muscle.name;
    mModel.Description = muscle.description;
    mModel.ShortDescription = muscle.shortDescription;
    mModel.ImageInBodyUrl = muscle.imageInBodyUrl;
    mModel.CreatedBy = muscle.createdBy;
    mModel.CreateOn = muscle.createdOn;
    mModel.BodySection = bodySection;
    modifiers.forEach((modifier) => {
      mModel.Modifiers.push(modifier);
    });
    mModel.save((err) => {
      console.log('after save');
      console.log(err);
      console.log(mModel);
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      MuscleService.prepareResult(deferred, successMessage, mModel, errorMessage, err);
      // console.log('--After all calls')
    }); 
    return deferred.promise;
  }

   /**
   * Get all Equipment from DB
   * @param {object} equipment
   */
  getMuscles(query) {
    let deferred = Q.defer();
    let mInstance = super.modelInstance();
    // console.log('instance');
    // console.log(mInstance.getModel());
    // console.log(mInstance.getModelSchema())
    let mModel = mInstance.getModelList();
    mModel.find(query, (err, muscles) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      MuscleService.prepareResult(deferred, successMessage, muscles, errorMessage, err);
    });
    return deferred.promise;
  }

  /**
   * Updates a single muscle
   * @param  {[type]} muscle    [description]
   * @param  {[type]} modifiers [description]
   * @return {[type]}           [description]
   */
  updateMuscle(muscle, modifiers) {
    let deferred = Q.defer();
    let mInstance = super.modelInstance();
    // console.log('instance');
    // console.log(mInstance.getModel());
    // console.log(mInstance.getModelSchema())
    let mModel = mInstance.getModelList();
    const successMessage = super.messages().UPDATED;
    const errorMessage = super.messages().COULD_NOT_SAVE;
    let updatedProps = {
      Name: muscle.name,
      Description: muscle.description,
      ShortDescription: muscle.shortDescription,
      ImageInBodyUrl: muscle.imageInBodyUrl,
      UpdatedBy: muscle.modifiedBy,
      UpdatedOn: muscle.modifiedOn,
    };
    // add modifiers just if they changed
    if (modifiers && modifiers.length > 0) {
      updatedProps.Modifiers = modifiers;
    }
    let query = MuscleService.queryById(muscle.id);
    let options = { multi: false };
    mModel.update(query, updatedProps, options, (err, dMuscle) => {
      MuscleService.prepareResult(deferred, successMessage, dMuscle, errorMessage, err);
    }); 
    return deferred.promise;
  }
}

module.exports.MuscleService = MuscleService;