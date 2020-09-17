const { Router } = require("express");
const { runSample } = require("../helpers/chatbot-api");
const logger = require("../../winston");
const authChecker = require("../helpers");
require("dotenv").config();

const { PROJECT_ID } = process.env;

const chatbot = Router();
chatbot.use(authChecker);

chatbot.get("/", (req, res) => {
  const { message } = req.query;
  runSample(PROJECT_ID, message)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      const data = {
        response: "Could you try rephrasing that? I didn't understand you.",
      };
      res.send(data);
      logger.error(err);
      res.status(500);
    });
  // res.send("yolo!");
});

module.exports = {
  chatbot,
};
