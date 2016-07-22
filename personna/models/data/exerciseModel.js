"use strict"
// Imports
const BaseDataModel = require('./baseDataModel').BaseDataModel;

// Symbol keys
const _exIdentity = null; // TODO: no worky 'MuscleId'

// schema definition
const _exSchema = {
  ExerciseId: {type: Number},
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
  constructor(exerciseType, identity) {
    const relTypes = BaseDataModel.relationShipTypes();
    // create relationships
    var relationships = [
      { childModel: exerciseType, type: relTypes.ONE_TO_ONE, fieldName: 'ExerciseType' },
      // { childModel: modifier, type: relTypes.ONE_TO_FEW_INLINE, fieldName: 'Modifiers' },
    ];
    super(_exSchema, _exSchemaName, relationships, _exIdentity, identity);
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