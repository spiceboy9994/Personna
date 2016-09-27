/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;

// Symbol keys
const _exIdentity = "ExerciseEquipmentId"; 

// schema definition
const _exSchema = {
  Description: {type: String},
  Notes: [String],
  AnimationUrl: {type: String},
  VideoUrl: {type: String},
  CreatedBy: {type: Number},
  CreatedOn: {type: Date},
  ModifiedBy: {type: Number},
  ModifiedOn: {type: Date},
};

const _exSchemaName = 'ExerciseEquipment';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class ExerciseEquipmentModel extends BaseDataModel {
  constructor(exercise, equipment, identity) {
    const relTypes = BaseDataModel.relationShipTypes();
    // create relationships
    var relationships = [
      { childModel: exercise, type: relTypes.ONE_TO_ONE_REF, fieldName: 'Exercise' },
      { childModel: equipment, type: relTypes.ONE_TO_FEW_INLINE, fieldName: 'Equipments' },
    ];
    super(_exSchema, _exSchemaName, true, relationships, _exIdentity, identity);
  }

  /**
   * Gets a BodySection Moongoose Model instance
   * @return {[type]} [description]
   */
  getModel() {
    return super.getModel();
  }

}

module.exports.ExerciseEquipmentModel = ExerciseEquipmentModel;