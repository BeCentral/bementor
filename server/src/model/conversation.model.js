const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conversation = new mongoose.Schema(
  {
    mentor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    mentee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
  }
);

module.exports = mongoose.model('Conversation', Conversation);
