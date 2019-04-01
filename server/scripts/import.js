const mongoose = require('mongoose');
const User = require('../src/model/user.model');

require('dotenv').config();

const run = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  });

  const names = require('./mentors.json');

  const models = names.map((rawUser) => {
    return new User({
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      interests: [rawUser.interest_0, rawUser.interest_1, rawUser.interest_2],
      bio: rawUser.about
    });
  });

  const savePromises = models.map((model) => {
      return model.save();
  });

  await Promise.all(savePromises);
  await mongoose.disconnect();
};

run();

