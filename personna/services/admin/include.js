// Services
const BodySectionService  = require('./bodySectionService').BodySectionService;
const EquipmentService  = require('./equipmentService').EquipmentService;
const ModifierService  = require('./modifierService').ModifierService;
const MuscleService  = require('./muscleService').MuscleService;
const ExerciseTypeService  = require('./exerciseTypeService').ExerciseTypeService;
const ExerciseService  = require('./exerciseService').ExerciseService;
const ExerciseEquipmentService  = require('./exerciseEquipmentService').ExerciseEquipmentService;
const MembershipTypeService = require('./membershipTypeService').MembershipTypeService;
const UserService = require('./userService').UserService;

module.exports = (dbConnection) => {
  return {
    Modifier: new ModifierService(dbConnection),
    BodySection: new BodySectionService(dbConnection),
    Equipment: new EquipmentService(dbConnection),
    ExerciseType: new ExerciseTypeService(dbConnection),
    Muscle: new MuscleService(dbConnection),
    Exercise: new ExerciseService(dbConnection),
    ExerciseEquipment: new ExerciseEquipmentService(dbConnection),
    MembershipType: new MembershipTypeService(dbConnection),
    User: new UserService(dbConnection),
  }
}