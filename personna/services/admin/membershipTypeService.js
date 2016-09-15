/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
// Imports
const Q                 = require('q'),
      BaseService       = require('../baseService').BaseService;

const DefaultMembershipName = 'Default';

/**
 * Controls Membership Type DB operations agaisnt the DB
 */
class MembershipTypeService extends BaseService {

  constructor(db) {
    super(db.dataModels().MembershipType);
  }

  /**
   * Gets the list of Membership Types
   * @param  {[type]} query [description]
   * @return {[type]}       [description]
   */
  getMembershipTypes(query) {
    let deferred = Q.defer();
    let mTypeInstance = super.modelInstance();
    let mTypeModels = mTypeInstance.getModelList();
    mTypeModels.find(query, (err, mTypes) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      MembershipTypeService.prepareResult(deferred, successMessage, mTypes, errorMessage, err);
    });
    return deferred.promise;
  }

  /** 
   * Gets default membership type
   */
  getDefaultMembership() {
    let defaultQuery = { Name: DefaultMembershipName };
    return this.getMembershipTypes(defaultQuery);
  }

  /**
   * Gets a Membership Type by id
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getById(id) {
    let deferred = Q.defer();
    let mTypeInstance = super.modelInstance();
    let mTypeModels = mTypeInstance.getModelList();
    mTypeModels.findById(id, (err, exercise) => {
      const successMessage = '';
      const errorMessage = super.messages().COULD_NOT_GET;
      MembershipTypeService.prepareResult(deferred, successMessage, exercise, errorMessage, err);
    });
    return deferred.promise;
  }

  /**
   * Creates a Membership type to the db
   */
  addMembershipType(mType) {
    let deferred = Q.defer();
    let mTypeInstance = super.modelInstance();
    let mTypeModel = mTypeInstance.getModel();
    mTypeModel.Name = mType.name;
    mTypeModel.Description = mType.description;
    mTypeModel.CanCreateRoutines = mType.canCreateRoutines;
    mTypeModel.CanAddExercises = mType.canAddExercises;
    mTypeModel.CanHaveTracking = mType.canHaveTracking;
    mTypeModel.CanHaveSocial = mType.canHaveSocial;
    mTypeModel.CanAlterRoutines = mType.canAlterRoutines;
    mTypeModel.IsPurchasable = mType.isPurchasable;
    mTypeModel.IsActive = mType.isActive;
    mTypeModel.save((err) => {
      const successMessage = super.messages().ADDED;
      const errorMessage = super.messages().COULD_NOT_SAVE;
      MembershipTypeService.prepareResult(deferred, successMessage, mTypeModel, errorMessage, err);
    }); 
    return deferred.promise;
  }
}

module.exports.MembershipTypeService = MembershipTypeService;