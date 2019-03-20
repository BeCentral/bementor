const Mentor = require('../model/mentor.model');

exports.findAll = (req, res) => {
  Mentor.find()
    .then((mentors) => { res.send(mentors); })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.search = (req, res) => {
  const query = req.query.text;

  Mentor.find({
    $text: {$search: query}
  })
    .then((mentors) => {
      res.send(mentors);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};
