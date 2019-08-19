const mongoose = require('mongoose');
const User = require('../model/user.model');
const Message = require('../model/message.model');

const selectUserById = id =>
  User.findById(id).select('firstName lastName tagline location picture');

const containerizeMessages = async (messages, currentUserId) => {
  const conversations = messages.reduce((convos, message) => {
    const partner =
      currentUserId === message.recipient.toString() ? message.sender : message.recipient;
    const convo = convos[partner] || { messages: [] };
    convos[partner] = {
      ...convo,
      // replace by populated user
      with: partner,
      messages: [...convo.messages, message]
    };
    return convos;
  }, {});
  return Promise.all(
    Object.keys(conversations).map(async partnerId => {
      const thisConvo = conversations[partnerId];
      conversations[partnerId].messages.sort((a, b) => a.date.getTime() - b.date.getTime());
      conversations[partnerId].lastActivity =
        thisConvo.messages[thisConvo.messages.length - 1].date;
      conversations[partnerId].with = await selectUserById(thisConvo.with);
      return conversations[partnerId];
    })
  );
};

exports.findAll = (req, res) => {
  const $uid = mongoose.Types.ObjectId(req.user.id);
  Message.aggregate([{ $match: { $or: [{ recipient: $uid }, { sender: $uid }] } }, { $limit: 50 }])
    .then(allMessages => {
      return containerizeMessages(allMessages, req.user.id);
    })
    .then(conversations => res.send(conversations));
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

exports.findWithUser = async (req, res) => {
  const partnerId = mongoose.Types.ObjectId(req.params.userId);
  const userId = mongoose.Types.ObjectId(req.user._id);
  let partner = null;
  try {
    partner = await selectUserById(partnerId);
  } catch (err) {
    return res.status(404).send('This user does not exist');
  }
  return Message.aggregate([
    { $match: { $or: [{ recipient: userId }, { sender: partnerId }] } },
    { $match: { $or: [{ recipient: partnerId }, { sender: userId }] } },
    { $limit: 50 }
  ]).then(messages => {
    if (messages.length > 0) {
      return res.send({
        messages: messages.sort((a, b) => a.date.getTime() - b.date.getTime()),
        with: partner,
        lastActivity: messages[messages.length - 1].date
      });
    }
    return res.send({
      messages: [],
      with: partner,
      lastActivity: new Date()
    });
  });
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
