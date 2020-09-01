const { models } = require("../index");

const { Garden, PlantInGarden } = models;

/**
 * Add a plant to a garden by garden Id, will throw an error
 *  if the garden isn't found
 * @param {Integer} id garden id to add the plant to
 * @param {Object} info information about the new plant
 * @returns {Plant} Plant Info or an Error if garden isn't found
 */
const addPlantToGarden = (id, info) =>
  new Promise((resolve, reject) => {
    Garden.findOne({ where: { id }, rejectOnEmpty: true })
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
 * Update the info for a plant in a garden, throws an error if not found
 * @param {Integer} id id of a plant in a garden
 * @param {Object} info the information about the plant to update
 * @returns {Plant} The updated plant
 */
const updatePlantInGarden = (id, info) =>
  new Promise((resolve, reject) => {
    PlantInGarden.update({ ...info }, { where: { id }, returning: true })
      .then(([rows, plant]) => {
        if (rows <= 0) throw new Error("Plant doesn't exist");
        resolve(plant[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

models.exports = {
  addPlantToGarden,
  updatePlantInGarden,
};
