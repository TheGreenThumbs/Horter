const { Router } = require("express");

const logger = require("../../winston");

const friend = Router();
const {
  addFriend,
  removeFriend,
  getFriends,
  getFriendStatus,
} = require("../../database/helpers/friend");

friend.get("/", (req, res) => {
  const { userId } = req.query;
  getFriends(userId)
    .then((data) => {
      res.send(data.map((user) => user.dataValues.friends));
    })
    .catch((err) => {
      logger.info(err);
      res.sendStatus(500);
    });
});

friend.get("/status", (req, res) => {
  const { userId, friendId } = req.query;
  getFriendStatus(userId, friendId)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch((err) => {
      logger.error("Error with friends table: %o", err);
      res.status(500).send(err);
    });
});

friend.post("/add", (req, res) => {
  const info = req.body;
  addFriend(info.id_user, info.id_friend)
    .then((data) => {
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
    .then(() => {
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
