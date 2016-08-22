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

module.exports = (identity) => {
    let bsModel = new BodySectionModel();
    let modifierModel = new ModifierModel();
    let exerciseTypeModel = new ExerciseTypeModel();
    let equipmentModel = new EquipmentModel();
    let muscleModel = new MuscleModel(bsModel, modifierModel, identity);
    let exerciseModel = new ExerciseModel(exerciseTypeModel, muscleModel, identity);
    return {
      BodySection: bsModel,
      Equipment: equipmentModel,
      ExerciseType: exerciseTypeModel,
      Modifier: modifierModel,
      Muscle: muscleModel,
      Exercise: exerciseModel,
      ExerciseEquipment: new ExerciseEquipmentModel(exerciseModel, equipmentModel, identity),
    }
}