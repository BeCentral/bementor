const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model('Message', Message);
