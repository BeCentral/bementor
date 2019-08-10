const mongoose = require('mongoose');
const Message = require('../model/message.model');

exports.findAll = (req, res) => {
  const $uid = mongoose.Types.ObjectId(req.user.id);
  Message.aggregate([
    { $match: { $or: [{ recipient: $uid }, { sender: $uid }] } },
    { $limit: 50 }
  ]).then(allMessages => {
    const conversations = allMessages.reduce((convos, message) => {
      const partner =
        req.user.id === message.recipient.toString() ? message.sender : message.recipient;
      const convo = convos[partner] || { messages: [] };
      convos[partner] = {
        ...convo,
        messages: [...convo.messages, message]
      };
      // replace by populated user
      if (!convo.with) convo.with = partner;
      return convos;
    }, {});
    Object.keys(conversations).forEach(conversationPartner => {
      conversations[conversationPartner].messages.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
    });
    res.send(conversations);
  });
};

exports.send = (req, res) => {
  if (req.user.id === req.body.recipient) {
    return res.status(400).send({ message: 'You cannot send yourself a message' });
  }
  return Message.create({
    body: req.body.message,
    recipient: req.body.recipient,
    sender: req.user.id,
    date: Date.now()
  }).then(message => res.status(201).send(message));
};

/*
exports.findAll = (req, res) => {
  Message.find({
    $or: [{ mentee: req.user._id }, { mentor: req.user._id }]
  })
    .populate('mentor')
    .populate('mentee')
    .then(conversations => {
      res.send(conversations);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Message.findById(id)
    .populate('mentor')
    .populate('mentee')
    .populate('messages')
    .then(conversation => {
      res.send(conversation);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const addMessage = async req => {
  const { id } = req.params;
  const conversation = await Message.findById(id);

  if (
    conversation.mentor._id.toString() !== req.user.id &&
    conversation.mentee._id.toString() !== req.user.id
  ) {
    throw new Error('Not authorized');
  }

  let message = new Message({
    text: req.body['message.text']
  });

  message = await message.save();

  conversation.messages.push(message);

  return conversation.save();
};

exports.message = (req, res) => {
  addMessage(req)
    .then(conversation => {
      res.send(conversation);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const initiateConversation = async req => {
  let conversation = await Message.findOne({
    mentor: req.body.mentor,
    mentee: req.user.id
  })
    .populate('mentor')
    .populate('mentee')
    .populate('messages');

  if (conversation) {
    return conversation;
  }

  let message = new Message({
    text: 'Hey do you want to be my mentor ?'
  });

  message = await message.save();

  conversation = new Message({
    mentor: req.body.mentor,
    mentee: req.user.id,
    messages: [message]
  });

  return conversation.save();
};

exports.initiate = async (req, res) => {
  initiateConversation(req)
    .then(conversation => {
      res.send(conversation);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

*/
