const users = require('../controller/user.controller');
const { requireAuth } = require('../lib/auth');

module.exports = (app) => {
  app.get('/user', users.findAll);
  app.get('/user/:id', users.findOne);
  app.post('/user/register', users.create);
  app.post('/user/login', users.login);
  app.get('/user/search', users.search);
  app.patch('/user/:id', requireAuth, users.update);
};
