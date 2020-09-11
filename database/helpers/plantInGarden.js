const { models } = require("../index");

const { PlantInGarden, Garden, Plant } = models;

/**
 * Add a plant to a garden by garden Id, will throw an error
 *  if the garden isn't found
 * @param {Integer} id garden id to add the plant to
 * @param {Object} info information about the new plant
 * @returns {Plant} Plant Info or an Error if garden isn't found
 */

// also add another parameter for plant id.
const addPlantToGarden = (id, info, plantId) =>
  new Promise((resolve, reject) => {
    PlantInGarden.create({ ...info, gardenId: id, plantId })
      .then((plant) => {
        resolve(plant);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Finds all the plants a user has in their garden only returns unique plants
 * @param {Integer} userId id of user to find plants in garden by
 * @returns {Array} Plants in Gardens belonging to user
 */
// TODO: Make this work once plants and Users table exists
const getAllPlantsInGarden = (userId) =>
  new Promise((resolve, reject) => {
    Garden.findAll({ where: { userId } })
      .then((gardens) => {
        return Promise.all(gardens.map((i) => i.getPlants({ include: Plant })));
      })
      .then((plants) => {
        const unique = [];
        const uniquePlants = plants.filter((plant) => {
          if (!unique.includes(plant.plantId)) {
            unique.push(plant.plantId);
            return true;
          }
          return false;
        });
        resolve(uniquePlants[0].map((i) => i.plant));
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

/**
 * Removes a plant in a garden currently errors if no plant found
 *  and returns {deleted: true} if it is deleted
 * @param {Integer} id id of plant in garden to be deleted
 * @returns {Object} Error if no plant found or {deleted: true}
 */
const removePlantInGarden = (id) =>
  new Promise((resolve, reject) => {
    PlantInGarden.destroy({ where: { id } })
      .then((rows) => {
        if (rows <= 0) throw new Error("Plant doesn't exist");
        resolve({ deleted: true });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  addPlantToGarden,
  updatePlantInGarden,
  removePlantInGarden,
  getAllPlantsInGarden,
};
