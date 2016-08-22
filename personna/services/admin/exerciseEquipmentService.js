/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('../baseService').BaseService,
      util              = require('util');
// filtered query filters
const eEquipPaths  = {
  Muscle: 'Muscles._id',
  ExerciseTypes: 'ExerciseTypes._id',
  BodySection: 'Muscles.BodySection._id',
  MainData: 'Name Muscles._id Muscles.BodySection._id ExerciseTypes._id ExerciseTypes.Name ExerciseTypes.IsPrimary' 
}
/**
 * Controls Body Section DB operations agaisnt the DB
 */
class ExerciseEquipmentService extends BaseService {
  
  constructor(db) {
    super(db.dataModels().ExerciseEquipment);
  }
  /**
   * Adds a Exercise  Equipment to the DB
   * @param {object} exercise Exercise
   */
  addExerciseEquipment(exerciseEquip, exercise, equipments) {
    let deferred = Q.defer();
    let exerciseEquipInstance = super.modelInstance();
    let exerciseEquipModel = exerciseEquipInstance.getModel();
    exerciseEquipModel.Name = exerciseEquip.name;
    exerciseEquipModel.Description = exerciseEquip.description;
    exerciseEquipModel.AnimationUrl = exerciseEquip.animationUrl;
    exerciseEquipModel.VideoUrl = exerciseEquip.videoUrl;
    exerciseEquipModel.Notes = exerciseEquip.notes;
    exerciseEquipModel.CreatedBy = exerciseEquip.createdBy;
    exerciseEquipModel.CreateOn = exerciseEquip.createdOn;
    equipments.forEach((equip) => {
      exerciseEquipModel.Equipments.push(equip);
    });
    exerciseEquipModel.Exercise.push(exercise);
    exerciseEquipModel.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      ExerciseEquipmentService.prepareResult(deferred, successMessage, exerciseEquipModel, errorMessage, err);
    }); 
    return deferred.promise;
  }

  /**
   * Updates an exercise Equipment
   * @param  {[type]} exercise [description]
   * @param  {[type]} eTypes   [description]
   * @return {[type]}          [description]
   */
  updateExerciseEquipment(exercise, equipments) {
    let deferred = Q.defer();
    let exerciseEquipInstance = super.modelInstance();
    let exerciseEquipModel = exerciseEquipInstance.getModelList();
    const successMessage = super.messages().UPDATED;
    const errorMessage = super.messages().COULD_NOT_SAVE;
    let updatedProps = {
      Name: exercise.name,
      Description: exercise.description,
      AnimationUrl: exercise.animationUrl,
      VideoUrl: exercise.videoUrl,
      Notes: exercise.notes,
      ModifiedBy: exercise.modifiedBy,
      ModifiedOn: exercise.modifiedOn,
    };
    // add equipmetns just of those changed
    if (equipments && equipments.length > 0) {
      console.log('--> equipments');
      console.log(equipments);
      updatedProps.Equipments = equipments;
    }
    let query = ExerciseEquipmentService.queryById(exercise.id);
    let options = { multi: false };
    exerciseEquipModel.update(query, updatedProps, options, (err, dExercise) => {
      ExerciseEquipmentService.prepareResult(deferred, successMessage, dExercise, errorMessage, err);
    }); 
    return deferred.promise;
  }

  /**
   * Gets the list of Exercises Equipments
   * @param  {[type]} query [description]
   * @return {[type]}       [description]
   */
  getExerciseEquipments(query) {
    let deferred = Q.defer();
    let exerciseEquipInstance = super.modelInstance();
    let exerciseEquipModel = exerciseEquipInstance.getModelList();
    let populateFilter = [];
    // if the query is defined, it needs to include the relationships
    if (query && Object.keys(query).length > 0) {
      let matchFilters = null;
      // create main aggregate
      populateFilter = [
         { "$match": query.query },
         { "$project": {
            _id: 1,
            ExerciseEquipmentId: 1,
            CreatedBy: 1,
            VideoUrl: 1,
            AnimationUrl: 1,
            Equipments: 1,
            Description: 1,
            Exercise: 1,
            
         }},
        { $unwind: '$Exercise' },
        { $lookup: {from: 'exercises', localField: 'Exercise', foreignField: '_id', as: 'ExerciseData'} },
      ];

      // Add the rest of the filters if any.
      if (query.extraFilters && Object.keys(query.extraFilters).length > 0) {
        if (query.extraFilters[eEquipPaths.Muscle]) {
          populateFilter.push({
            '$match': { 'ExerciseData.Muscles._id': query.extraFilters[eEquipPaths.Muscle] },
          });
        }

        if (query.extraFilters[eEquipPaths.BodySection]) {
          populateFilter.push({
            '$match': { 'ExerciseData.Muscles.BodySection._id': query.extraFilters[eEquipPaths.BodySection] },
          });
        }

        if (query.extraFilters[eEquipPaths.ExerciseTypes]) {
          populateFilter.push({
            '$match': { 'ExerciseData.ExerciseTypes._id': query.extraFilters[eEquipPaths.ExerciseTypes] },
          });
        }
      }
      exerciseEquipModel.aggregate(populateFilter, (err, exEquips) => {
        const successMessage = '';
        const errorMessage = super.messages().COULD_NOT_GET;
        ExerciseEquipmentService.prepareResult(deferred, successMessage, exEquips, errorMessage, err);
      });
    } else {
      // get all
      exerciseEquipModel.find({}, (err, exEquips) => {
        const successMessage = '';
        const errorMessage = super.messages().COULD_NOT_GET;
        ExerciseEquipmentService.prepareResult(deferred, successMessage, exEquips, errorMessage, err);
      }); 
    }
    return deferred.promise;
  }

  /**
   * Gets a query to filter exercise equipments
   * @param  {[type]} exIds exercise ids
   * @param  {[type]} eqIds equipment ids
   * @param  {[type]} mIds  muscle ids
   * @param  {[type]} etIds exercise type ids
   * @param  {[type]} bsIds body section ids
   * @return {[type]}       [description]
   */
  getFilteredQuery(exIds, eqIds, mIds, etIds, bsIds) {
    let query = {};
    let extraFilters = {};
    if (exIds && exIds.length > 0) {
      query['Exercise'] = { $in: ExerciseEquipmentService.idsToMongoose(exIds) };
    }
    
    if (eqIds && eqIds.length > 0) {
      query['Equipments._id'] = { $in: ExerciseEquipmentService.idsToMongoose(eqIds) };
    }

    if (mIds && mIds.length > 0) {
      extraFilters[eEquipPaths.Muscle] = { $in: ExerciseEquipmentService.idsToMongoose(mIds) };
    }

    if (etIds && etIds.length > 0) {
      extraFilters[eEquipPaths.ExerciseTypes] = { $in: ExerciseEquipmentService.idsToMongoose(etIds) };
    }

    if (bsIds && bsIds.length > 0) {
      extraFilters[eEquipPaths.BodySection] = { $in: ExerciseEquipmentService.idsToMongoose(bsIds) };
    }

    return { query: query, extraFilters: extraFilters };
  }
}

module.exports.ExerciseEquipmentService = ExerciseEquipmentService;