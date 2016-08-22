// Services
const BodySectionService  = require('./bodySectionService').BodySectionService;
const EquipmentService  = require('./equipmentService').EquipmentService;
const ModifierService  = require('./modifierService').ModifierService;
const MuscleService  = require('./muscleService').MuscleService;
const ExerciseTypeService  = require('./exerciseTypeService').ExerciseTypeService;
const ExerciseService  = require('./exerciseService').ExerciseService;
const ExerciseEquipmentService  = require('./exerciseEquipmentService').ExerciseEquipmentService;

module.exports = (dbConnection) => {
  return {
    Modifier: new ModifierService(dbConnection),
    BodySection: new BodySectionService(dbConnection),
    Equipment: new EquipmentService(dbConnection),
    ExerciseType: new ExerciseTypeService(dbConnection),
    Muscle: new MuscleService(dbConnection),
    Exercise: new ExerciseService(dbConnection),
    ExerciseEquipment: new ExerciseEquipmentService(dbConnection),
  }
}