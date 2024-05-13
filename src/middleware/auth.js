const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require("../models/user.js");

//Extraction
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

//Token Authentication
passport.use(
  new JWTStrategy(opts, async function (jwt_payload, done) {
    const id = jwt_payload.id;
    try {
      const user = await User.findById(id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }
  })
);

module.exports = passport.authenticate("jwt", { session: false });
