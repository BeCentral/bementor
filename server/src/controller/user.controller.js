const User = require('../model/user.model');

exports.findAll = (req, res) => {
  User.find()
    .then((users) => { res.send(users); })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
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
    .select('-password')
    .select('-passwordResetToken')
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};
