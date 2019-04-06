const conversations = require('../controller/conversation.controller');

module.exports = (app) => {
  app.get('/conversation', conversations.findAll);
  app.post('/conversation', conversations.initiate);
  app.get('/conversation/:id', conversations.findOne);
  app.patch('/conversation/:id', conversations.message);
};
