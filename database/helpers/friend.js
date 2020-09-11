const logger = require("../../winston");
const { models } = require("../index");

const { Friend } = models;

const addFriend = (userId, friendId) => {
  return new Promise((resolve, reject) => {
    Friend.create({ id_user: userId, id_friend: friendId })
      .then((friend) => {
        resolve(friend);
      })
      .catch((err) => {
        logger.error("Error making a friend: %o", err);
        reject(err);
      });
  });
};

const removeFriend = (userId, friendId) => {
  return new Promise((resolve, reject) => {
    Friend.destroy({
      where: {
        id_user: userId,
        id_friend: friendId,
      },
    })
      .then((friend) => {
        resolve(friend);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getFriends = (userId) => {
  return new Promise((resolve, reject) => {
    Friend.findAll({
      where: { id_user: userId },
      include: [
        {
          model: models.User,
          as: "friends",
        },
      ],
    })
      .then((friends) => {
        resolve(friends);
      })
      .catch((err) => reject(err));
  });
};

const getFriendStatus = (userId, friendId) =>
  new Promise((resolve, reject) => {
    Friend.findOne({ where: { id_user: userId, id_friend: friendId } })
      .then((status) => {
        resolve(!!status);
      })
      .catch((err) => {
        logger.error("Error with friends table: %o", err);
        reject(err);
      });
  });

module.exports = {
  addFriend,
  removeFriend,
  getFriends,
  getFriendStatus,
};
