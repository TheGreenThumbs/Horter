const { Router } = require("express");

const logger = require("../../winston");
const friend = Router();
const { addFriend } = require("../../database/helpers/friend");

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
    .then((data) => logger.info(data))
    .catch((err) => logger.error(err));

  res.send("friend post");
});

friend.delete("/remove", (req, res) => {
  logger.info(req.query);

  res.send("friend delete!");
});

module.exports = {
  friend,
};
