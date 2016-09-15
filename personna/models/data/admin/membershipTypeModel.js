/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;

// Symbol keys
const _mtSchemaKey = Symbol();

// schema definition
const _mtSchema = {
  Name: {type: String},
  Description: {type: String},
  CanCreateRoutines: {type: Boolean},
  CanAddExercises: {type: Boolean},
  CanHaveTracking: {type: Boolean},
  CanHaveSocial: {type: Boolean},
  CanAlterRoutines: {type: Boolean},
  IsPurchasable: {type: Boolean},
  IsActive: {type: Boolean},
};

const _mtSchemaName = 'MembershipType';

/**
 * Represents the Membership Type Mongoose Schema and Model
 */
class MembershipTypeModel extends BaseDataModel {
  constructor() {
    super(_mtSchema, _mtSchemaName, true);
  }

  /**
   * Gets a Membership Type Moongoose Model instance
   * @return {[type]} [description]
   */
  getModel() {
    return super.getModel();
  }

}

module.exports.MembershipTypeModel = MembershipTypeModel;