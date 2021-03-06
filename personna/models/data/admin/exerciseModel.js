/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;

// Symbol keys
const _exIdentity = "ExerciseId"; 

// schema definition
const _exSchema = {
  Name: {type: String},
  Description: {type: String},
  CreatedBy: {type: Number},
  CreatedOn: {type: Date},
  ModifiedBy: {type: Number},
  ModifiedOn: {type: Date},
};

const _exSchemaName = 'Exercise';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class ExerciseModel extends BaseDataModel {
  constructor(exerciseType, muscle, identity) {
    const relTypes = BaseDataModel.relationShipTypes();
    // create relationships
    var relationships = [
      { childModel: exerciseType, type: relTypes.ONE_TO_FEW_INLINE, fieldName: 'ExerciseTypes' },
      { childModel: muscle, type: relTypes.ONE_TO_FEW_INLINE, fieldName: 'Muscles' },
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

module.exports.ExerciseModel = ExerciseModel;