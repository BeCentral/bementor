const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    tagline: {
      type: String
    },
    location: {
      type: String
    },
    twitter: {
      type: String
    },
    github: {
      type: String
    },
    interests: {
      type: [String]
    },
    role: {
      type: String
    },
    picture: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

User.index({
  firstName: 'text', lastName: 'text', bio: 'text', interests: 'text'
});

module.exports = mongoose.model('User', User);
