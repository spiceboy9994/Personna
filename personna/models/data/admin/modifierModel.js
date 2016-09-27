/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;

// Symbol keys
const _modSchemaKey = Symbol();

// schema definition
const _modSchema = {
  ModifierId: {type: Number},
  Name: {type: String},
  Description: {type: String},
};

const _modSchemaName = 'Modifier';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class ModifierModel extends BaseDataModel {
  constructor() {
    super(_modSchema, _modSchemaName, true);
  }

  /**
   * Gets a BodySection Moongoose Model instance
   * @return {[type]} [description]
   */
  getModel() {
    return super.getModel();
  }

}

module.exports.ModifierModel = ModifierModel;