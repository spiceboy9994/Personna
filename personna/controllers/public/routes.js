var index = require('./index');
var users = require('./userController');
var account = require('./accountController');
var security = require('./../../middleware/security');

var userAutenticatedRoutes = {
  '/': true,
}

module.exports = (app) => {
  // Load controllers.....or if you want to call them `Routes` that's fine, too.
  app.use('/user', security.isUserAuthenticated(userAutenticatedRoutes), users);
  app.use('/account', account);
  app.use('/', index);
};
