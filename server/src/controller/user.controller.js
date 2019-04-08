const User = require('../model/user.model');
const { hash, compareHash } = require('../lib/util');
const { sendAccountConfirmationEmail, sendPasswordResetEmail } = require('../lib/email');
const { createToken, findUserByToken } = require('../lib/auth');

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
    .then(async (result) => {
      const newUser = result.toObject();
      delete newUser.password;
      const token = await createToken(user);
      await sendAccountConfirmationEmail(user.email, token);
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

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // "accept" the password reset request even if the email isn't tied to a registered user account
  // https://ux.stackexchange.com/questions/87079/reset-password-appropriate-response-if-email-doesnt-exist
  if (!user) return res.status(202).send();

  const token = await createToken(user);
  return sendPasswordResetEmail(user.email, token)
    .then(() => res.status(202).send())
    .catch(mailError => console.log(mailError));
};

const completePasswordReset = async (req, res) => {
  const { token, password } = req.body;

  const user = await findUserByToken(token);
  if (!user) return res.status(401).send({ message: 'Invalid token' });

  user.password = await hash(password);
  user.isPending = false;
  await user.save();

  return res.status(204).send({ message: 'New password set successfully' });
};

exports.resetPassword = (req, res) => {
  const { token } = req.body;
  if (!token) return requestPasswordReset(req, res);
  return completePasswordReset(req, res);
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
