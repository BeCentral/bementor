const messages = require('../controller/message.controller');
const { requireAuth } = require('../lib/auth');

module.exports = app => {
  app.get('/message', requireAuth, messages.findAll);
  app.get('/message/:userId', requireAuth, messages.findWithUser);
  app.post('/message/:userId', requireAuth, messages.send);
};
