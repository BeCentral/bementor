const mongoose = require('mongoose');

const MentorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      text: true
    },
    lastName: {
      type: String,
      required: true,
      text: true
    },
    about: {
      type: String,
      required: true,
      text: true
    },
    interests: {
      type: [String],
      required: false,
      text: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Mentor', MentorSchema);
