const User = require('../model/user.model');
const { hash, compareHash } = require('../lib/util');

exports.findAll = (req, res) => {
  User.find()
    .then((users) => { res.send(users); })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => { res.send(user); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.create = async (req, res) => {
  const user = new User({
    ...req.body,
    password: await hash(req.body.password)
  });

  User.create(user)
    .then((result) => {
      const newUser = result.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.search = (req, res) => {
  const query = req.query.text;

  User.find({
    $text: { $search: query }
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};
