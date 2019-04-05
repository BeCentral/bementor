const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const { JWT_SECRET } = process.env;

const authOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

const jwtAuth = new JwtStrategy(authOptions, (payload, done) => {
  User.findById(payload._id)
    .then(user => done(null, user.toObject()))
    .catch(err => done(err, null));
});

passport.use(jwtAuth);

exports.createToken = user => jwt.sign({ _id: user._id }, JWT_SECRET);

exports.requireAuth = passport.authenticate('jwt', { session: false });
