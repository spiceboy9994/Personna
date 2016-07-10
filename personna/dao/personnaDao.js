 "use strict"
const BodySectionModel  = require('../models/data/bodySectionModel').BodySectionModel;
const EquipmentModel    = require('../models/data/equipmentModel').EquipmentModel;
const ExerciseTypeModel     = require('../models/data/exerciseTypeModel').ExerciseTypeModel;
const ModifierModel    = require('../models/data/modifierModel').ModifierModel;
const MuscleModel           = require('../models/data/muscleModel').MuscleModel;

const _modelsKey = Symbol();
class PersonaDataModels {
  static GetModels() {
     // Load dependencies
    let bsModel = new BodySectionModel();
    let modifierModel = new ModifierModel();
    this[_modelsKey] = {
      BodySection: bsModel,
      Equipment: new EquipmentModel(),
      ExerciseType: new ExerciseTypeModel(),
      Modifier: modifierModel,
      Muscle: new MuscleModel(bsModel, modifierModel),
    }

    return  this[_modelsKey];

  }

  // addItem(item, callback) {  
  //   this[_baseConn].collection(this[_collectionKey]).insert(item, {ordered: true}, function(err, resultDoc) {
  //     const result = new ResultModel();
  //     if (err) {
  //       result.setSuccess(false);
  //       result.setMessage(util.format('%s cannot be saved', this[_friendlyCollNameKey]));
  //       result.setResult(err);
  //     } else {
  //       result.setSuccess(true);
  //       result.setMessage(util.format('%s saved succesfully', this[_friendlyCollNameKey]));
  //       result.setResult(resultDoc);
  //     }
  //     callback(result);
  //   });
  // }

  // getAllItems(callback) {
  //   this[_baseConn].collection(this[_collectionKey]).find(function(err, cursor) {
  //     const result = new ResultModel();
  //     if (err) {
  //       result.setSuccess(false);
  //       result.setMessage(util.format('%s cannot be retrieved', this[_friendlyCollNameKey]));
  //       result.setResult(err);
  //       callback(null, result);
  //     } else {
  //       result.setSuccess(true);
  //       result.setMessage('');
  //       cursor.toArray(callback(result));
  //     }
      
  //   })
  // }
}

module.exports.PersonaDataModels = PersonaDataModels;