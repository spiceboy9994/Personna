/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('./baseService').BaseService;
/**
 * Controls Modifiers DB operations agaisnt the DB
 */
class ModifierService extends BaseService {
// TODO Best approach for classes using controllers and services
  constructor(db) {
    super(db.dataModels().Modifier);
  }
   /**
   * Adds an Modifier  to the DB
   * @param {object} section Modifier
   */
  addModifier(modifier) {
    let deferred = Q.defer();
    let modifierInstance = super.modelInstance();
    let modifierModel = modifierInstance.getModel();
    modifierModel.Name = modifier.name;
    modifierModel.ModifierId = modifier.id;
    modifierModel.Description = modifier.description;
    modifierModel.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      ModifierService.prepareResult(deferred, successMessage, modifierModel, errorMessage, err);
    }); 
    return deferred.promise;
  }

   /**
   * Get all Modifier from DB
   * @param {object} equipment
   */
  getModifiers(query) {
    let deferred = Q.defer();
    let modifierInstance = super.modelInstance();
    let modifier = modifierInstance.getModelList();
    console.log(query);
    modifier.find(query, (err, modifiers) => {
      const successMessage = '';
      // console.log('--Find');
      // console.log(modifiers);
      const errorMessage = super.messages().COULD_NOT_GET;
      ModifierService.prepareResult(deferred, successMessage, modifiers, errorMessage, err);
    });
    return deferred.promise;
  }

  /**
   * Generates multiple ids as a moongose valid array
   * @param  {[type]} ids [description]
   * @return {[type]}     [description]
   */
  getByMultiplesIds(ids) {
    let idArray = ModifierService.idsToMongoose(ids);
    let query = {
      '_id': {
        $in: idArray
      }
    };
    return this.getModifiers(query); 

  }

}

module.exports.ModifierService = ModifierService;