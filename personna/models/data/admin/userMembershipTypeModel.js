/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const BaseDataModel = require('../baseDataModel').BaseDataModel;


// schema definition
const _usMtypeSchema = {
  ValidSince: {type: Date},
  ExpiresOn: {type: Date},
  IsActive: {type: Boolean},
  CreatedBy: {type: Number},
  CreatedOn: {type: Date},
  ModifiedBy: {type: Number},
  ModifiedOn: {type: Date},
};

const _usMtypeSchemaName = 'UserMembership';

/**
 * Represents the User Membership (roles) Mongoose Schema and Model
 */
class UserMembershipModel extends BaseDataModel {
  constructor(mType) {
    const relTypes = BaseDataModel.relationShipTypes();
    // create relationships
    var relationships = [
      { childModel: mType, type: relTypes.ONE_TO_ONE_REF, fieldName: 'MembershipType' }
    ];
    super(_usMtypeSchema, _usMtypeSchemaName, false, relationships);
  }

  /**
   * Gets a BodySection Moongoose Model instance
   * @return {[type]} [description]
   */
  getModel() {
    return super.getModel();
  }
}

module.exports.UserMembershipModel = UserMembershipModel;
