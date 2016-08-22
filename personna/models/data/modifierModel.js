/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('./baseDataModel').BaseDataModel;

// Symbol keys
const _bsSchemaKey = Symbol();

// schema definition
const _bsSchema = {
  ModifierId: {type: Number},
  Name: {type: String},
  Description: {type: String},
};

const _bsSchemaName = 'Modifier';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class ModifierModel extends BaseDataModel {
  constructor() {
    super(_bsSchema, _bsSchemaName);
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