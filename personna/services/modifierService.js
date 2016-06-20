"use strict"
// Imports
const Q                 = require('q'),
      ModifierModel    = require('../models/data/modifierModel').ModifierModel,
      // ResultModel       = require('../models/result/resultModel').ResultModel,
      BaseService       = require('./baseService').BaseService,
      strings           = require('../models/strings/crudStrings').CrudStrings;

const _msInstance =  Symbol();
"use strict"
/**
 * Controls Modifiers DB operations agaisnt the DB
 */
class ModifierService {

  constructor() {
    this[_msInstance] = new ModifierModel();
  }
   /**
   * Adds an Modifier  to the DB
   * @param {object} section Modifier
   */
  addModifier(modifier) {
    let deferred = Q.defer();
    let modifierInstance = this[_msInstance];
    let modifierModel = modifierInstance.getModel();
    modifierModel.Name = modifier.name;
    modifierModel.ModifierId = modifier.id;
    modifierModel.Description = modifier.description;
    modifierModel.save((err) => {
      const successMessage = strings.Messages(modifierInstance.getSchemaName()).ADDED;
      const errorMessage = strings.Messages(modifierInstance.getSchemaName()).COULD_NOT_SAVE;
      BaseService.prepareResult(deferred, successMessage, modifierModel, errorMessage, err);
    }); 
    return deferred.promise;
  }

   /**
   * Get all Modifier from DB
   * @param {object} equipment
   */
  getModifiers(query) {
    let deferred = Q.defer();
    let modifierInstance = this[_msInstance];
    let modifier = modifierInstance.getModelList();
    modifier.find(query, (err, modifiers) => {
      const successMessage = '';
      const errorMessage = strings.Messages(modifierInstance.getSchemaName()).COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, modifiers, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.ModifierService = ModifierService;