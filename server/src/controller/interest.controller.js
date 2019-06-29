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

const doInterestAddition = interest => Interest.findOne({ name: interest })
  .then((interestToIncrement) => {
    if (!interestToIncrement) return Interest.create({ name: interest });
    interestToIncrement.count += 1;
    return interestToIncrement.save();
  });

const doInterestRemoval = interest => Interest.findOne({ name: interest })
  .then((interestToDecrement) => {
    interestToDecrement.count -= 1;
    if (interestToDecrement.count < 1) return Interest.findOneAndRemove({ name: interest });
    return interestToDecrement.save();
  });

exports.update = (oldInterests, newInterests) => {
  const intsToAdd = newInterests.filter(int => !oldInterests.includes(int));
  const intsToRemove = oldInterests.filter(int => !newInterests.includes(int));
  const additionQueue = intsToAdd.map(doInterestAddition);
  const removalQueue = intsToRemove.map(doInterestRemoval);

  return Promise.all(additionQueue.concat(removalQueue)).then(() => {
    const q = newInterests.map(int => Interest.findOne({ name: int }));
    return Promise.all(q);
  });
};
