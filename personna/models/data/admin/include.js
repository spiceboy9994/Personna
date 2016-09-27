/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
 "use strict"
const BodySectionModel        = require('./bodySectionModel').BodySectionModel;
const EquipmentModel          = require('./equipmentModel').EquipmentModel;
const ExerciseTypeModel       = require('./exerciseTypeModel').ExerciseTypeModel;
const ModifierModel           = require('./modifierModel').ModifierModel;
const MuscleModel             = require('./muscleModel').MuscleModel;
const ExerciseModel           = require('./exerciseModel').ExerciseModel;
const ExerciseEquipmentModel  = require('./exerciseEquipmentModel').ExerciseEquipmentModel;
const MembershipTypeModel     = require('./membershipTypeModel').MembershipTypeModel;
const UserMembershipModel     = require('./userMembershipTypeModel').UserMembershipModel;
const UserModel               = require('./userModel').UserModel;

module.exports = (identity) => {
    let bsModel = new BodySectionModel();
    let modifierModel = new ModifierModel();
    let exerciseTypeModel = new ExerciseTypeModel();
    let equipmentModel = new EquipmentModel();
    let muscleModel = new MuscleModel(bsModel, modifierModel, identity);
    let exerciseModel = new ExerciseModel(exerciseTypeModel, muscleModel, identity);
    let memberTypeModel = new MembershipTypeModel();
    let userMemberTypeModel = new UserMembershipModel(memberTypeModel);
    let userModel = new UserModel(userMemberTypeModel, identity);
    return {
      BodySection: bsModel,
      Equipment: equipmentModel,
      ExerciseType: exerciseTypeModel,
      Modifier: modifierModel,
      Muscle: muscleModel,
      Exercise: exerciseModel,
      ExerciseEquipment: new ExerciseEquipmentModel(exerciseModel, equipmentModel, identity),
      MembershipType: memberTypeModel,
      UserMembershipType: userMemberTypeModel,
      User: userModel,
    }
}