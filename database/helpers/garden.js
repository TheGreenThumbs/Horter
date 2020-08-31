const { models } = require("../index");

const { Garden } = models;

/**
 * Create a garden, will need to be modified to be owned by a user
 * @param {Object} info all of the information about a new garden
 * @returns {Garden} Sequelize info about the garden you just made
 */
const createGarden = (info) =>
  new Promise((resolve, reject) => {
    Garden.create({ ...info })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Find a garden by id, throws an error if none is found
 * @param {Integer} id garden id to locate garden by
 * @returns {Garden} Garden Info or an Error if none found
 */
const findGardenById = (id) =>
  new Promise((resolve, reject) => {
    Garden.findOne({ where: { id }, rejectOnEmpty: true })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  createGarden,
  findGardenById,
};
