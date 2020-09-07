const { Router } = require("express");
const { runSample } = require("../helpers/chatbot-api");

const chatbot = Router();

chatbot.get("/", (req, res) => {
  runSample();
  res.send("yolo!");
});

module.exports = {
  chatbot,
};
