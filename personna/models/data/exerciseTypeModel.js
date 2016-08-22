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
  Name: {type: String},
  IsPrimary: {type: Boolean},
  Description: {type: String},
};

const _bsSchemaName = 'ExerciseType';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class ExerciseTypeModel extends BaseDataModel {
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

module.exports.ExerciseTypeModel = ExerciseTypeModel;