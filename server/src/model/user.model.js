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
      type: String,
      required: true
    },
    tagline: {
      type: String,
      required: true
    },
    campus: {
      type: String,
      required: true
    },
    interests: {
      type: [String],
      required: false
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
