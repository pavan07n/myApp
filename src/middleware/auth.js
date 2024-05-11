const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require("../models/user.js");

//Extraction
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "RandomsecretString";

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

const authMiddleware = passport.authenticate("jwt", { session: false });

module.exports = authMiddleware;
