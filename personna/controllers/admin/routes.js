var bodySection = require('./bodySectionController');
var equipment = require('./equipmentController');
var exerciseType = require('./exerciseTypeController');
var exercise = require('./exerciseController');
var modifier = require('./modifierController');
var muscle = require('./muscleController');
var exerciseEquipment = require('./exerciseEquipmentController');
var membershipType = require('./membershipTypeController');
var security = require('./../../middleware/security');
// required permissions
var adminPermissions = {
  POST: {
    canAddExercises: true,
  },
  PUT: {
    canAddExercises: true,
  },
  GET: {
    canQueryCatalogs: true,
  },
};

var membershipPermissions = {
  POST: {
    canAlterUsers: true,
  },
  PUT: {
    canAlterUsers: true,
  },
  GET: {
    canQueryCatalogs: true,
  },
}


module.exports = (app, passport) => {
  // Load controllers.....or if you want to call them `Routes` that's fine, too.
  app.use('/bodySection', security.validatePermissions(adminPermissions), bodySection);
  app.use('/equipment', security.validatePermissions(adminPermissions), equipment);
  app.use('/modifier', security.validatePermissions(adminPermissions), modifier);
  app.use('/exercisetype', security.validatePermissions(adminPermissions), exerciseType);
  app.use('/muscle', security.validatePermissions(adminPermissions), muscle);
  app.use('/exercise', security.validatePermissions(adminPermissions), exercise);
  app.use('/exercise-equipment', security.validatePermissions(adminPermissions), exerciseEquipment);
  app.use('/membership-type', security.validatePermissions(membershipPermissions), membershipType);
};
