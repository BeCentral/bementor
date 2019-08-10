const conversations = require('../controller/message.controller');
const { requireAuth } = require('../lib/auth');

module.exports = app => {
  /*
  app.get('/message', requireAuth, conversations.findAll);
  app.post('/message', requireAuth, conversations.initiate);
  app.get('/message/:id', requireAuth, conversations.findOne);
  app.patch('/message/:id', requireAuth, conversations.message);
  */
};
