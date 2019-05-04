const mongoose = require('mongoose');

const Interest = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Interest', Interest);
