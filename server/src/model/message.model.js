const mongoose = require('mongoose');

const { Schema } = mongoose;

const Message = new mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

Message.index({
  sender: 1,
  recipient: 1
});

module.exports = mongoose.model('Message', Message);
