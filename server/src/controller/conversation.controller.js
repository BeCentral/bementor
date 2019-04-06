const Conversation = require('../model/conversation.model');
const Message = require('../model/message.model');

exports.findAll = (req, res) => {
  // TODO: change by cookie
  const userId = "5ca0cd9a287d2f3b6520d370";

  Conversation.find({
    $or: [
      {mentee: userId},
      {mentor: userId}
    ]
  }).populate('mentor')
    .populate('mentee')
    .then((conversations) => {
      res.send(conversations);
    })
    .catch((err) => {
      res.status(500).send({message: err.message});
    });
};

exports.findOne = (req, res) => {
  const {id} = req.params;
  Conversation.findById(id)
    .populate('mentor')
    .populate('mentee')
    .populate('messages')
    .then((conversation) => {
      res.send(conversation);
    })
    .catch((err) => {
      res.status(500).send({message: err.message});
    });
};

exports.message = (req, res) => {
  addMessage(req)
    .then((conversation) => {
      res.send(conversation);
    })
    .catch((err) => {
      res.status(500).send({message: err.message});
    });
};

const addMessage = async (req) => {
  // TODO: add permission check

  const {id} = req.params;
  let conversation = await Conversation.findById(id);

  let message = new Message({
    text: req.body["message.text"]
  });

  message = await message.save();

  conversation.messages.push(message);

  return await conversation.save();
};

exports.initiate = async (req, res) => {
  initiateConversation(req)
    .then((conversation) => {
      res.send(conversation);
    })
    .catch((err) => {
      res.status(500).send({message: err.message});
    });
};

const initiateConversation = async (req) => {
  // TODO: change by cookie
  const userId = "5ca0cd9a287d2f3b6520d370";

  let conversation = await Conversation.findOne({
    mentor: req.body.mentor,
    mentee: userId,
  })
    .populate('mentor')
    .populate('mentee')
    .populate('messages');

  if (conversation) {
    return conversation;
  }

  let message = new Message({
    text: "Hey do you want to be my mentor ?"
  });

  message = await message.save();

  conversation = new Conversation({
    mentor: req.body.mentor,
    mentee: userId,
    messages: [message]
  });

  return await conversation.save();
};
