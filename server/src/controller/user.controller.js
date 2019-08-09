const User = require('../model/user.model');
const interests = require('./interest.controller');
const { hash, compareHash } = require('../lib/util');
const { sendAccountConfirmationEmail, sendPasswordResetEmail } = require('../lib/email');
const { createToken, findUserByToken } = require('../lib/auth');

const cookieIsSecure = process.env.ENVIRONMENT === 'production';

exports.findAll = async (req, res) => {
  User.find()
    .populate('interests')
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('interests')
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.create = async (req, res) => {
  const password = await hash(req.body.password);
  User.create({ ...req.body, password, location: req.body.location.toLowerCase() })
    .then(async user => {
      user.accountConfirmationToken = await createToken(user, '1 hour');
      return user.save();
    })
    .then(async user => {
      const newUser = user.toObject();
      await sendAccountConfirmationEmail(user.email, user.accountConfirmationToken);
      delete newUser.password;
      delete newUser.accountConfirmationToken;
      res.send(newUser);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.authenticate = (req, res) => res.status(200).send(req.user);
exports.logout = (req, res) =>
  res
    .status(204)
    .clearCookie('jwt')
    .send();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const rawUser = await User.findOne({ email })
      .populate('interests')
      .select('+password')
      .select('+firstLogin');
    if (!rawUser) throw new Error('Incorrect username or password');

    const passwordIsCorrect = await compareHash(password, rawUser.password);
    if (!passwordIsCorrect) throw new Error('Incorrect username or password');

    const user = rawUser.toObject();
    delete user.password;
    const token = createToken(user);
    return res
      .status(200)
      .cookie('jwt', token, { httpOnly: true, secure: cookieIsSecure })
      .send(user);
  } catch (error) {
    if (!error.message)
      return res.status(500).send({ message: 'An unexpected error occurred during login' });
    return res.status(401).send({ message: error.message });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // "accept" the password reset request even if the email isn't tied to a registered user account
  // https://ux.stackexchange.com/questions/87079/reset-password-appropriate-response-if-email-doesnt-exist
  if (!user) return res.status(202).send();

  const token = await createToken(user, '1 hour');
  user.passwordResetToken = token;
  return user
    .save()
    .then(() => sendPasswordResetEmail(user.email, token))
    .then(() => res.status(202).send())
    .catch(mailError => console.log(mailError));
};

const completePasswordReset = async (req, res) => {
  const { token, password } = req.body;

  const user = await findUserByToken(token);
  if (!user) return res.status(401).send({ message: 'Invalid token' });
  if (!user.passwordResetToken)
    res.status(403).send({ message: 'User did not request password reset' });

  user.password = await hash(password);
  user.passwordResetToken = null;
  await user.save();

  return res.status(204).send({ message: 'New password set successfully' });
};

exports.resetPassword = (req, res) => {
  const { token } = req.body;
  if (!token) return requestPasswordReset(req, res);
  return completePasswordReset(req, res);
};

exports.confirmAccount = async (req, res) => {
  const { token } = req.body;

  const user = await findUserByToken(token);
  if (!user) return res.status(401).send({ message: 'Invalid token' });

  user.accountConfirmationToken = null;
  user.pending = false;
  return user.save().then(() => res.status(204).send());
};

exports.search = async (req, res) => {
  const filters = req.query;
  const interestFilters = filters.interests
    ? filters.interests.split(',').map(i => i.toLowerCase())
    : [];
  const query = {
    $match: { $and: [] }
  };
  if (filters.search) {
    const searchQuery = filters.search.toLowerCase();
    query.$match.$and.push({
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { tagline: { $regex: searchQuery, $options: 'i' } },
        { bio: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } }
      ]
    });
  }
  if (filters.location)
    query.$match.location = { $regex: filters.location.toLowerCase(), $options: 'i' };
  const isMentor = filters.mentor === 'true';
  const isMentee = filters.mentee === 'true';
  if (!isMentor && !isMentee) {
    query.$match.$and.push({ isMentor });
    query.$match.$and.push({ isMentee });
  } else {
    query.$match.$and.push({
      $or: [{ isMentor }, { isMentee }]
    });
  }
  User.aggregate([query])
    .then(users => User.populate(users, { path: 'interests' }))
    .then(users => {
      const result =
        interestFilters.length > 0
          ? users.filter(u => {
              const hasInterests = u.interests.filter(i => interestFilters.includes(i.name));
              return hasInterests.length > 0;
            })
          : users;
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() !== id)
    return res.status(403).send({ message: 'You can only edit your own profile' });
  const newUser = { ...req.body, profileFtue: false };
  // replace underscores and whitespace
  const providedInterests = newUser.interests || req.user.interests;
  const transformedInterests = providedInterests.map(i => i.replace(/[\W_]+/g, '').toUpperCase());
  return interests
    .update(req.user.interests.map(i => i.name), [...new Set(transformedInterests)])
    .then(newInterests =>
      User.findOneAndUpdate(
        { _id: id },
        // remove duplicates from interests if provided
        { ...newUser, interests: newInterests },
        { new: true }
      ).populate('interests')
    )
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};
