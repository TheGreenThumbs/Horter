require("dotenv").config();
const express = require("express");
const session = require("express-session");
const PGSession = require("connect-pg-simple")(session);
const SessionPool = require("pg").Pool;
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");

// const logger = require("../winston");
const { friend } = require("./routes/friend");
const { apiSearch } = require("./routes/apiSearch");
const { gardenInfo } = require("./routes/gardenInfo");
const { chatbot } = require("./routes/chatbot");
const { wishListRouter, authRouter } = require("./routes");
const { userHelpers } = require("../database/helpers");
const { stores } = require("./routes/nearbyStores");
const { userInfo } = require("./routes/user.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "horter";
const dbUser = process.env.DB_USER || "postgres";
const dbPass = process.env.DB_PASS || "";

const poolOptions = {
  user: dbUser,
  password: dbPass,
  host: dbHost,
  database: dbName,
};
if (!process.env.NODE_ENV === "development") {
  poolOptions.port = process.env.DB_PORT;
}

const sessionDB = new SessionPool(poolOptions);

app.use(
  session({
    store: new PGSession({
      pool: sessionDB,
      tableName: "session",
    }),
    name: "SID",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: true,
      secure: !process.env.NODE_ENV === "development",
    },
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

app.use("/friend", friend);
app.use("/api/search", apiSearch);
app.use("/garden", gardenInfo);
app.use("/chatbot", chatbot);
app.use("/wishlist", wishListRouter);
app.use("/auth", authRouter);
app.use("/stores", stores);
app.use("/user", userInfo);

app.use("/", express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = {
  app,
};
