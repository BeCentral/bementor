const mongoose = require('mongoose');
const Mentor = require('../src/model/mentor.model');

require('dotenv').config();

const run = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  });

  const names = require('./mentors.json');

  const models = names.map((rawMentor) => {
    return new Mentor({
      firstName: rawMentor.firstName,
      lastName: rawMentor.lastName,
      interests: [rawMentor.interest_0, rawMentor.interest_1, rawMentor.interest_2],
      bio: rawMentor.about
    });
  });

  const savePromises = models.map((model) => {
      return model.save();
  });

  await Promise.all(savePromises);
  await mongoose.disconnect();
};

run();

