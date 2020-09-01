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
    Garden.findOne({ where: { id }, rejectOnEmpty: true })
      .then((garden) => {
        resolve(garden);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Add a plant to a garden, doesn't work until plants table exists
 *  will throw an error if the garden isn't found
 * @param {Integer} id garden id to add the plant to
 * @param {Object} info information about the new plant
 * @returns {Plant} Plant Info or an Error if garden isn't found
 */
const addPlantToGarden = (id, info) =>
  new Promise((resolve, reject) => {
    findGardenById(id)
      .then((garden) => {
        return garden.createPlantInGarden({ ...info });
      })
      .then((plant) => {
        resolve(plant);
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
 * Update the info for a plant in a garden, throws an error if not found
 *  Currently doesn't work, should probably move this
 * @param {Integer} id id of a plant in a garden
 * @param {Object} info the information about the plant to update
 * @returns {Plant} The updated plant
 */
const updatePlantInGarden = (id, info) =>
  new Promise((resolve, reject) => {
    PlantInGarden.update({ ...info }, { where: { id }, returning: true }) // eslint-disable-line
      .then(({ rows, plant }) => {
        if (rows <= 0) throw new Error("Plant doesn't exist");
        resolve(plant);
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

/**
 * Removes a plant in a garden currently errors if no plant found
 *  and returns {deleted: true} if it is deleted
 *  currently doesn't work, should probably move this
 * @param {Integer} id id of plant in garden to be deleted
 * @returns {Object} Error if no plant found or {deleted: true}
 */
const removePlantInGarden = (id) =>
  new Promise((resolve, reject) => {
    PlantInGarden.destroy({ where: { id } }) // eslint-disable-line
      .then((rows) => {
        if (rows <= 0) throw new Error("Plant doesn't exist");
        resolve({ deleted: true });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  createGarden,
  findGardenById,
  addPlantToGarden,
  updateGardenInfo,
  updatePlantInGarden,
  removeGarden,
  removePlantInGarden,
};
