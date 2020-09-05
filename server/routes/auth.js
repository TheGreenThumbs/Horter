const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { Router } = require("express");

// const logger = require("../../winston");
const { userHelpers } = require("../../database/helpers");

const authRouter = Router();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      userHelpers
        .findUserByGoogleId(profile.id)
        .then((user) => {
          if (!user) {
            const { displayName, name, id, photos } = profile;
            const newUser = {
              username: displayName,
              id_google: id,
              s3_id: photos[0].value,
              firstname: name.givenName,
              lastname: name.familyName,
              lat: 29,
              lng: -90,
            };
            userHelpers
              .createUser(newUser)
              .then((createdUser) => {
                done(null, createdUser);
              })
              .catch((err) => {
                done(err);
              });
          } else {
            done(null, user);
          }
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

module.exports = authRouter;
