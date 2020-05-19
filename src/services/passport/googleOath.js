const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../../models/User');
const config = require('../../config/config');

// serializeUser and deserializeUser are responsible for authenticating users using cookies.
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.
// This means supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's
// behalf, along with the user's profile.  The function must invoke `done`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: config.googleCallbackUrl,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      const newUser = await new User({
        googleId: profile.id,
        // TODO: What if there is already a name like that?
        username: profile.displayName,
        active: true,
        jwtTokens: null,
      }).save();

      done(null, newUser);
    }
  )
);
