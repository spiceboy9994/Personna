var bodySection = require('./bodySectionController');
var equipment = require('./equipmentController');
var exerciseType = require('./exerciseTypeController');
var exercise = require('./exerciseController');
var modifier = require('./modifierController');
var muscle = require('./muscleController');
var exerciseEquipment = require('./exerciseEquipmentController');

module.exports = (app) => {
  // Load controllers.....or if you want to call them `Routes` that's fine, too.
  app.use('/bodySection', bodySection);
  app.use('/equipment', equipment);
  app.use('/modifier', modifier);
  app.use('/exercisetype', exerciseType);
  app.use('/muscle', muscle);
  app.use('/exercise', exercise);
  app.use('/exercise-equipment', exerciseEquipment);
};
