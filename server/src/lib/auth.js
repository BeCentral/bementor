const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../model/user.model');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const { JWT_SECRET } = process.env;

const authOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: 'bementor.be'
};

const jwtAuth = new JwtStrategy(authOptions, (payload, done) => {
  User.findById(payload._id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

passport.use(jwtAuth);
