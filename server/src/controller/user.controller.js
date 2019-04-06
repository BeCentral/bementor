const User = require('../model/user.model');
const { hash, compareHash } = require('../lib/util');
const { createToken } = require('../lib/auth');

const cookieIsSecure = process.env.ENVIRONMENT === 'production';

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

exports.authenticate = (req, res) => res.status(200).send(req.user);
exports.logout = (req, res) => res.status(204).clearCookie('jwt').send();

exports.login = (req, res) => {
  const { email, password } = req.body;
  let foundUser = null;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return res.status(401).send({ message: 'Incorrect username or password' });
      foundUser = user;
      return compareHash(password, user.password);
    })
    .then((success) => {
      if (!success) return res.status(401).send({ message: 'Incorrect username or password' });
      const user = foundUser.toObject();
      delete user.password;
      const token = createToken(user);
      return res
        .status(200)
        .cookie('jwt', token, { httpOnly: true, secure: cookieIsSecure })
        .send(user);
    })
    .catch(err => res.status(500).send({ message: err.message }));
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
  if (req.user._id.toString() !== id) return res.status(403).send({ message: 'You can only edit your own profile' });
  return User.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};
