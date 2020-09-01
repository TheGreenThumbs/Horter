const { models } = require("../index");

const { Garden, PlantInGarden } = models;

/**
 * Create a garden, will need to be modified to be owned by a user
 * @param {Object} info all of the information about a new garden
 * @returns {Garden} Sequelize info about the garden you just made
 */
const createGarden = (info) =>
  new Promise((resolve, reject) => {
    Garden.create({ ...info })
      .then((garden) => {
        resolve(garden);
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
    Garden.findOne({
      where: { id },
      rejectOnEmpty: true,
      include: PlantInGarden,
    })
      .then((garden) => {
        resolve(garden);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Updates a garden with the given information based on garden id
 *  throws an error if no garden is found
 * @param {Integer} id id of garden to update
 * @param {Object} info the information about the garden to update
 * @returns {Garden} The updated garden
 */
const updateGardenInfo = (id, info) =>
  new Promise((resolve, reject) => {
    Garden.update({ ...info }, { where: { id }, returning: true })
      .then(([rows, gardens]) => {
        if (rows <= 0) throw new Error("Garden doesn't exist");
        resolve(gardens[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Removes a garden and should cascade through it's associations
 *  currently errors if no garden found and returns {deleted: true}
 *  if it is deleted
 * @param {Integer} id id of garden to be deleted
 * @returns {Object} Error if no Garden found or {deleted: true}
 */
const removeGarden = (id) =>
  new Promise((resolve, reject) => {
    Garden.destroy({ where: { id } })
      .then((rows) => {
        if (rows <= 0) throw new Error("Garden doesn't exist");
        resolve({ deleted: true });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  createGarden,
  findGardenById,
  updateGardenInfo,
  removeGarden,
};
