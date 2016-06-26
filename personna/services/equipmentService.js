"use strict"
// Imports
const Q                 = require('q'),
      EquipmentModel    = require('../models/data/equipmentModel').EquipmentModel,
      // ResultModel       = require('../models/result/resultModel').ResultModel,
      BaseService       = require('./baseService').BaseService,
      strings           = require('../models/strings/crudStrings').CrudStrings;

const _esInstance =  Symbol();

/**
 * Controls Equipment DB operations agaisnt the DB
 */
class EquipmentService {

  constructor() {
    this[_esInstance] = new EquipmentModel();
  }
   /**
   * Adds an Equipment  to the DB
   * @param {object} section Equipment
   */
  addEquipment(equip) {
    let deferred = Q.defer();
    let equipmentInstance = this[_esInstance];
    let equipment = equipmentInstance.getModel();
    equipment.Name = equip.name;
    equipment.EquipmentId = equip.id;
    equipment.Description = equip.description;
    equipment.save((err) => {
      const successMessage = strings.Messages(equipmentInstance.getSchemaName()).ADDED;
      const errorMessage = strings.Messages(equipmentInstance.getSchemaName()).COULD_NOT_SAVE;
      BaseService.prepareResult(deferred, successMessage, equipment, errorMessage, err);
    }); 
    return deferred.promise;
  }

   /**
   * Get all Equipment from DB
   * @param {object} equipment
   */
  getEquipments(query) {
    let deferred = Q.defer();
    let equipmentInstance = this[_esInstance];
    let equipment = equipmentInstance.getModelList();
    equipment.find(query, (err, equipments) => {
      const successMessage = '';
      const errorMessage = strings.Messages(equipmentInstance.getSchemaName()).COULD_NOT_GET;
      BaseService.prepareResult(deferred, successMessage, equipments, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.EquipmentService = EquipmentService;