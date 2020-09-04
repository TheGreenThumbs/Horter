const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth");

passport.use(
  new GoogleStrategy(
    {
      callBackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // const {displayName, id, photos} = profile;
      // Add a user
      done();
    }
  )
);
