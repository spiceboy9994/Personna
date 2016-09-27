/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;

// Symbol keys
const _usSchemaKey = Symbol();
const _userIdIdentity = "UserId"; 

// Symbol keys


// schema definition
const _usSchema = {
  UserName: {type: String, required: true, unique: true, dropDups: true},
  FirstName: {type: String},
  LastName:  {type: String},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  IsActive: {type: Boolean, required: true},
  FacebookId: {type: String},
  FacebookToken: {type: String},
  GoogleId: {type: String},
  MSDNId: {type: String},
  CreatedBy: {type: Number},
  CreatedOn: {type: Date},
  ModifiedBy: {type: Number},
  ModifiedOn: {type: Date},
};

const _usSchemaName = 'User';

/**
 * Represents the BodySection Mongoose Schema and Model
 */
class UserModel extends BaseDataModel {
  constructor(usMtype, identity) {
    const relTypes = BaseDataModel.relationShipTypes();
    // create relationships
    var relationships = [
      { childModel: usMtype, type: relTypes.ONE_TO_FEW_INLINE, fieldName: 'UserMemberShips' }
    ];
    super(_usSchema, _usSchemaName, true, relationships, _userIdIdentity, identity, true);
  }

  /**
   * Gets a BodySection Moongoose Model instance
   * @return {[type]} [description]
   */
  getModel() {
    return super.getModel();
  }

}

module.exports.UserModel = UserModel;
