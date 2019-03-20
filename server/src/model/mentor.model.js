const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      required: false,
    }
  },
  {
    timestamps: true
  }
);

mentorSchema.index({firstName: "text", lastName: "text", about: "text", interests: "text"});

module.exports = mongoose.model('Mentor', mentorSchema);
