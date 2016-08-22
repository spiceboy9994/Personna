/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('../baseService').BaseService;

/**
 * Controls Body Section DB operations agaisnt the DB
 */
class ExerciseService extends BaseService {
  
  constructor(db) {
    super(db.dataModels().Exercise);
  }
  /**
   * Adds a Exercise to the DB
   * @param {object} exercise Exercise
   */
  addExercise(exercise, eTypes, muscles) {
    let deferred = Q.defer();
    let exerciseInstance = super.modelInstance();
    let exerciseModel = exerciseInstance.getModel();
    exerciseModel.Name = exercise.name;
    exerciseModel.Description = exercise.description;
    exerciseModel.CreatedBy = exercise.createdBy;
    exerciseModel.CreateOn = exercise.createdOn;
    eTypes.forEach((eType) => {
      exerciseModel.ExerciseTypes.push(eType);
    });
    muscles.forEach((muscle) => {
      exerciseModel.Muscles.push(muscle);
    })
    exerciseModel.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      console.log('--> Response');
      console.log(exerciseModel);
      ExerciseService.prepareResult(deferred, successMessage, exerciseModel, errorMessage, err);
    }); 
    return deferred.promise;
  }

  /**
   * Updates an exercise
   * @param  {[type]} exercise [description]
   * @param  {[type]} eTypes   [description]
   * @return {[type]}          [description]
   */
  updateExercise(exercise, eTypes, muscles) {
    let deferred = Q.defer();
    let exerciseInstance = super.modelInstance();
    let exerciseModel = exerciseInstance.getModelList();
    const successMessage = super.messages().UPDATED;
    const errorMessage = super.messages().COULD_NOT_SAVE;
    let updatedProps = {
      Name: exercise.name,
      Description: exercise.description,
      ModifiedBy: exercise.modifiedBy,
      ModifiedOn: exercise.modifiedOn,
    }
    // add modifiers just if they changed
    if (eTypes && eTypes.length > 0) {
      updatedProps.ExerciseTypes = eTypes;
    }
    // add muscles if they changed
    if (muscles && muscles.length > 0) {
       updatedProps.Muscles = muscles;
    }
    let query = ExerciseService.queryById(exercise.id);
    let options = { multi: false };
    exerciseModel.update(query, updatedProps, options, (err, dExercise) => {
      ExerciseService.prepareResult(deferred, successMessage, dExercise, errorMessage, err);
    }); 
    return deferred.promise;
  }

  /**
   * Gets the list of Exercises
   * @param  {[type]} query [description]
   * @return {[type]}       [description]
   */
  getExercises(query) {
    let deferred = Q.defer();
    let exerciseInstance = super.modelInstance();
    let exerciseModel = exerciseInstance.getModelList();
    exerciseModel.find(query, (err, exercises) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      ExerciseService.prepareResult(deferred, successMessage, exercises, errorMessage, err);
    });
    return deferred.promise;
  }

  /**
   * Gets a Exercise by id
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getById(id) {
    let deferred = Q.defer();
    let exerciseInstance = super.modelInstance();
    let exerciseModel = exerciseInstance.getModelList();
    exerciseModel.findById(id, (err, exercise) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, exercise, errorMessage, err);
    });
    return deferred.promise;
  }

}

module.exports.ExerciseService = ExerciseService;