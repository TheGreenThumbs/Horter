const { Router } = require("express");
const { runSample } = require("../helpers/chatbot-api");
// const { loggers } = require("winston");
require("dotenv").config();

const { PROJECT_ID } = process.env;

const chatbot = Router();

chatbot.get("/", (req, res) => {
  const { message } = req.query;
  runSample(PROJECT_ID, message)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
  //res.send("yolo!");
});

module.exports = {
  chatbot,
};
