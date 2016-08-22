/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;

// Symbol keys
const _bsSchemaKey = Symbol();

// schema definition
const _bsSchema = {
  BodySectionId: {type: Number},
  Name: {type: String},
};

const _bsSchemaName = 'BodySection';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class BodySectionModel extends BaseDataModel {
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

module.exports.BodySectionModel = BodySectionModel;