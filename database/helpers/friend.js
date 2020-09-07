const { models } = require("../index");

const { Friend } = models;

const addFriend = (userId, friendId) => {
  return new Promise((resolve, reject) => {
    Friend.create({ id_user: userId, id_friend: friendId })
      .then((friend) => resolve(friend))
      .catch((err) => reject(err));
  });
};

module.exports = {
  addFriend,
};
