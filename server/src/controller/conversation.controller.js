const Conversation = require('../model/conversation.model');
const Message = require('../model/message.model');

exports.findAll = (req, res) => {
  Conversation.find({
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
  Conversation.findById(id)
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
  const conversation = await Conversation.findById(id);

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
  let conversation = await Conversation.findOne({
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

  conversation = new Conversation({
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
