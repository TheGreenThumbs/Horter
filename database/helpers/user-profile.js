const { Op } = require("sequelize");
const { models } = require("../index");

const { User } = models;

/**
 * Create a user, creates a new user
 * @param {Object} newUser new user information
 * @returns {User} Sequelize info about the new user you just made
 */
const createUser = (newUser) =>
  new Promise((resolve, reject) => {
    User.create({ ...newUser })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

const findUserById = (id) =>
  new Promise((resolve, reject) => {
    User.findOne({ where: { id }, rejectOnEmpty: true })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

const findUserByGoogleId = (idGoogle) =>
  new Promise((resolve, reject) => {
    User.findOne({ where: { id_google: idGoogle } })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find a user by username, throws an error if none is found
 * @param {Integer} username username to get user by
 * @returns {User} User Obj or an Error if none found
 */
const findUserByUsername = (username) =>
  new Promise((resolve, reject) => {
    User.findOne({
      where: {
        username: {
          [Op.iLike]: `%${username}%`,
        },
      },
      rejectOnEmpty: true,
    })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Updates a user with the given information based on user id
 *  throws an error if no garden is found
 * @param {Integer} id id of user to update
 * @param {Object} info the information about the user to update
 * @returns {User} The updated user
 */
const updateUser = (id, info) =>
  new Promise((resolve, reject) => {
    User.update({ ...info }, { where: { id }, returning: true })
      .then(([rows, user]) => {
        if (rows <= 0) throw new Error("User doesn't exist");
        resolve(user[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Removes a user and should cascade through it's associations
 *  currently errors if no user found and returns {deleted: true}
 *  if it is deleted
 * @param {Integer} id id of user to be deleted
 * @returns {Object} Error if no USer found or {deleted: true}
 */
const removeUser = (id) =>
  new Promise((resolve, reject) => {
    User.destroy({ where: { id } })
      .then((rows) => {
        if (rows <= 0) throw new Error("User doesn't exist");
        resolve({ deleted: true });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  createUser,
  findUserByUsername,
  updateUser,
  removeUser,
  findUserByGoogleId,
  findUserById,
};
