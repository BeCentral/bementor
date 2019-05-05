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

exports.update = (oldInterests, newInterests) => {
  const intsToRemove = oldInterests.filter(int => !newInterests.includes(int));
  const intsToAdd = newInterests.filter(int => !oldInterests.includes(int));

  let queue = intsToRemove.map(intId => Interest.findById(intId)
    .then((interestToDecrement) => {
      interestToDecrement.count -= 1;
      if (interestToDecrement.count < 1) return Interest.findByIdAndRemove(intId);
      return interestToDecrement.save();
    }));

  queue = queue.concat(intsToAdd.map(intId => Interest.findById(intId)
    .then((interestToIncrement) => {
      if (!interestToIncrement) return Interest.create({ name: intId });
      interestToIncrement.count += 1;
      return interestToIncrement.save();
    })));

  return Promise.all(queue);
};
