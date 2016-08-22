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
  EquipmentId: {type: Number},
  Name: {type: String},
  Description: {type: String},
};

const _bsSchemaName = 'Equipment';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class EquipmentModel extends BaseDataModel {
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

module.exports.EquipmentModel = EquipmentModel;