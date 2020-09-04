const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth");
const { Router } = require("express");

const logger = require("../../winston");
const { userHelpers } = require("../../database/helpers");

const authRouter = Router();

passport.use(
  new GoogleStrategy(
    {
      callBackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // const {displayName, id, photos} = profile;
      // const newUser = {
      //   username: displayName,
      //   id_google: id,
      //   s3_id: photos,
      // }
      logger.info(profile);
      userHelpers.createUser();
      done(null, profile.displayName);
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

module.exports = authRouter;
