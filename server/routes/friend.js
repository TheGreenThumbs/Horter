const { Router } = require("express");

const logger = require("../../winston");

const friend = Router();
const {
  addFriend,
  removeFriend,
  getFriends,
} = require("../../database/helpers/friend");

friend.get("/", (req, res) => {
  logger.info(req.query);
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
