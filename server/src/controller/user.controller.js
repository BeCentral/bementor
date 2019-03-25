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
