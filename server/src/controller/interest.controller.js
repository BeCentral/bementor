const Interest = require('../model/interest.model');

exports.create = (req, res) => {
  const newInterest = req.body.name.toLowerCase();
  Interest.findOne({ name: newInterest })
    .then((interest) => {
      if (interest) return res.status(200).send(interest);
      return Interest.create({ name: newInterest });
    })
    .then((interest) => {
      res.status(201).send(interest);
    });
};
