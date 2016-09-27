var index = require('./index');
var users = require('./userController');

module.exports = (app) => {
  // Load controllers.....or if you want to call them `Routes` that's fine, too.
  app.use('/user', users);
  app.use('/', index);
};
