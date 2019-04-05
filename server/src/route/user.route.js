const users = require('../controller/user.controller');

module.exports = (app) => {
  app.get('/user', users.findAll);
  app.get('/user/:id', users.findOne);
  app.post('/user/register', users.create);
  app.get('/user/search', users.search);
  app.patch('/user/:id', users.update);
};
