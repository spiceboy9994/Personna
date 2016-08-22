/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('./baseDataModel').BaseDataModel;
// const BodySectionModel = require('./bodySectionModel').BaseDataModel;
// const ModifierModel = require('./modifierModel').ModifierModel;

// Symbol keys
const _mSchemaKey = Symbol();
const _mIdentity = "MuscleId"; // TODO: no worky 'MuscleId'

// schema definition
const _mSchema = {
  // MuscleId: {type: Number},
  Name: {type: String},
  Description: {type: String},
  ShortDescription: {type: String},
  ImageInBodyUrl: {type: String},
  MainImageUrl: {type: String},
  CreatedBy: {type: Number},
  CreatedOn: {type: Date},
  ModifiedBy: {type: Number},
  ModifiedOn: {type: Date},
};

const _mSchemaName = 'Muscle';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class MuscleModel extends BaseDataModel {
  constructor(bodySection, modifier, identityBuilder) {
    const relTypes = BaseDataModel.relationShipTypes();
    // create relationships
    var relationships = [
      { childModel: bodySection, type: relTypes.ONE_TO_ONE, fieldName: 'BodySection' },
      { childModel: modifier, type: relTypes.ONE_TO_FEW_INLINE, fieldName: 'Modifiers' },
    ];
    super(_mSchema, _mSchemaName, relationships, _mIdentity, identityBuilder);
  }

  /**
   * Gets a BodySection Moongoose Model instance
   * @return {[type]} [description]
   */
  getModel() {
    return super.getModel();
  }

}

module.exports.MuscleModel = MuscleModel;