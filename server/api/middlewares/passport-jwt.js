const Passport = require('passport');
const PassportJWT = require('passport-jwt');

const getConfig = require('../../config/config');
const User = require('../resources/user/user.model');

const config = getConfig(process.env.NODE_ENV);

module.exports = configJWTStrategy = () => {
  const options = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
  };

  Passport.use(
    new PassportJWT.Strategy(options, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};