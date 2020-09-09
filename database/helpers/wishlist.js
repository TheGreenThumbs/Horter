const { models } = require("../index");

const { WishList, Plant } = models;

/**
 * Add a plant to a user's wishlist
 * @param {Integer} userId id of user
 * @param {Integer} plantId id of plant
 */
const addToWishList = (userId, plantId) =>
  new Promise((resolve, reject) => {
    WishList.findOrCreate({ where: { plantId, userId } })
      .then((wishlist) => {
        resolve(wishlist[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find all of a user's wishlist items
 * @param {Integer} userId id of user
 */
const getUserWishList = (userId) =>
  new Promise((resolve, reject) => {
    WishList.findAll({
      where: { userId },
      include: { model: Plant, as: "plant" },
    })
      .then((list) => {
        resolve(list);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Delete a wishlist item
 * @param {Integer} id id of wishlist item
 */
const deleteWishListItem = (id) =>
  new Promise((resolve, reject) => {
    WishList.destroy({ where: { id } })
      .then((rows) => {
        if (rows <= 0) throw new Error("WishList Item doesn't exist");
        resolve({ deleted: true });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  addToWishList,
  getUserWishList,
  deleteWishListItem,
};
