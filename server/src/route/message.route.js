const messages = require('../controller/message.controller');
const { requireAuth } = require('../lib/auth');

module.exports = app => {
  app.get('/message', requireAuth, messages.findAll);
  app.post('/message', requireAuth, messages.send);
};
