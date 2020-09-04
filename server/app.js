const express = require("express");

require("dotenv").config();

const path = require("path");

const bodyParser = require("body-parser");
const { apiSearch } = require("./routes/apiSearch");
const { gardenInfo } = require("./routes/gardenInfo");
const { chatbot } = require("./routes/chatbot");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../client/build")));
app.use("/api/search", apiSearch);
app.use("/garden", gardenInfo);
app.use("/chatbot", chatbot);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = {
  app,
};
