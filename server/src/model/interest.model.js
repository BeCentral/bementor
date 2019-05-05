const mongoose = require('mongoose');

const Interest = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    count: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Interest', Interest);
