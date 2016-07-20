"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('./baseService').BaseService;

/**
 * Controls Equipment DB operations agaisnt the DB
 */
class EquipmentService extends BaseService {

  constructor(db) {
    super(db.dataModels().Equipment);
  }
   /**
   * Adds an Equipment  to the DB
   * @param {object} section Equipment
   */
  addEquipment(equip) {
    let deferred = Q.defer();
    let equipmentInstance = super.modelInstance();
    let equipment = equipmentInstance.getModel();
    equipment.Name = equip.name;
    equipment.EquipmentId = equip.id;
    equipment.Description = equip.description;
    equipment.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      EquipmentService.prepareResult(deferred, successMessage, equipment, errorMessage, err);
    }); 
    return deferred.promise;
  }

   /**
   * Get all Equipment from DB
   * @param {object} equipment
   */
  getEquipments(query) {
    let deferred = Q.defer();
    let equipmentInstance = super.modelInstance();
    let equipment = equipmentInstance.getModelList();
    equipment.find(query, (err, equipments) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      EquipmentService.prepareResult(deferred, successMessage, equipments, errorMessage, err);
    });
    return deferred.promise;
  }
}

module.exports.EquipmentService = EquipmentService;