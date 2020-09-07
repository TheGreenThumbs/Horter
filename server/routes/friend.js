const { Router } = require("express");

const logger = require("../../winston");

const friend = Router();
const { addFriend, removeFriend } = require("../../database/helpers/friend");

// GET/userId Get all a user's friends
// POST/friendId add a friend to current user
// DELETE/friendId delete a friend from current user

friend.get("/", (req, res) => {
  logger.info(req.query);
  // need id_user here in query params
  res.send("friend home!");
});

friend.post("/add", (req, res) => {
  const info = req.body;
  addFriend(info.id_user, info.id_friend)
    .then((data) => {
      logger.info(data);
      res.send(data);
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500);
    });
});

friend.delete("/remove", (req, res) => {
  const info = req.body;
  removeFriend(info.id_user, info.id_friend)
    .then((data) => {
      logger.info(data);
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500);
    });
});

module.exports = {
  friend,
};
