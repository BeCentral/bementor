const User = require('../model/user.model');
const passport = require('passport');
const { JwtStrategy, ExtractJwt } = require('passport-jwt');

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
