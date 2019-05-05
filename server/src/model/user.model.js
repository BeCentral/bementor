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
    interests: [
      {
        type: mongoose.ObjectId,
        ref: 'Interest',
        default: []
      }
    ],
    picture: {
      type: String
    },
    password: {
      type: String,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    accountConfirmationToken: {
      type: String,
      select: false
    },
    email: {
      required: true,
      type: String,
      unique: true
    },
    pending: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: 'user'
    },
    profileFtue: {
      type: Boolean,
      default: true
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
