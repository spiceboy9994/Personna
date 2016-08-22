var index = require('./index');
var users = require('./users');

module.exports = (app) => {
  // Load controllers.....or if you want to call them `Routes` that's fine, too.
  app.use('/users', users);
  app.use('/', index);
};
