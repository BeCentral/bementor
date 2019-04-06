const conversations = require('../controller/conversation.controller');
const { requireAuth } = require('../lib/auth');

module.exports = (app) => {
  app.get('/conversation', requireAuth, conversations.findAll);
  app.post('/conversation', requireAuth, conversations.initiate);
  app.get('/conversation/:id', requireAuth, conversations.findOne);
  app.patch('/conversation/:id', requireAuth, conversations.message);
};
