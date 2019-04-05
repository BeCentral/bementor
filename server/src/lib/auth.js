const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const JwtStrategy = passportJWT.Strategy;

const { JWT_SECRET } = process.env;

const authOptions = {
  jwtFromRequest: req => ((req && req.cookies) ? req.cookies.jwt : null),
  secretOrKey: JWT_SECRET
};

const jwtAuth = new JwtStrategy(authOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

passport.use(jwtAuth);

exports.createToken = user => jwt.sign({ sub: user._id }, JWT_SECRET);

exports.requireAuth = passport.authenticate('jwt', { session: false });
