require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");

// const logger = require("../winston");
const { apiSearch } = require("./routes/apiSearch");
const { gardenInfo } = require("./routes/gardenInfo");
const { chatbot } = require("./routes/chatbot");
const { wishListRouter, authRouter } = require("./routes");
const { userHelpers } = require("../database/helpers");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id });
});

passport.deserializeUser((userSession, done) => {
  userHelpers
    .findUserById(userSession.id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.static(path.join(__dirname, "../client/build")));
app.use("/api/search", apiSearch);
app.use("/garden", gardenInfo);
app.use("/chatbot", chatbot);
app.use("/wishlist", wishListRouter);
app.use("/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = {
  app,
};
