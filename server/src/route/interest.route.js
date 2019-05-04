const interests = require('../controller/interest.controller');
const { requireAuth } = require('../lib/auth');

module.exports = (app) => {
  app.post('/interest', requireAuth, interests.create);
};
