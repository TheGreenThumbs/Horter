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
        return garden.createPlant({ ...info });
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
 * @param {*} info the information about the garden to update
 */
const updateGardenInfo = (id, info) =>
  new Promise((resolve, reject) => {
    Garden.update({ ...info }, { where: { id }, returning: true })
      .then(({ rows, garden }) => {
        if (rows <= 0) throw new Error("Garden doesn't exist");
        resolve(garden);
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
};
