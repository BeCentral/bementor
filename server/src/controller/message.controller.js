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
  const recipient = req.params.userId;
  const sender = req.user.id;
  if (recipient === sender) {
    return res.status(400).send({ message: 'You cannot send yourself a message' });
  }

  return Message.create({
    body: req.body.message,
    recipient,
    sender,
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
