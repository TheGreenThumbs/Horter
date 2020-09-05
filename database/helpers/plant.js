const { models } = require("../index");

const { Plant } = models;

const createPlant = (info) =>
  new Promise((resolve, reject) => {
    Plant.findOne({
      where: {
        id_trefle: info.id_trefle,
      },
    })
      .then((plant) => {
        if (plant === null) {
          Plant.create({ ...info }).then((data) => {
            resolve(data);
          });
        } else {
          resolve(plant);
        }
      })
      .catch((err) => reject(err));
  });

const createPlantWithSelfData = ({ data }) =>
  new Promise((resolve, reject) => {
    const newPlant = { ...data, id_trefle: data.id };
    delete newPlant.id;
    Plant.create(newPlant)
      .then((plant) => {
        resolve(plant);
      })
      .catch((err) => {
        reject(err);
      });
  });

const findPlantByTrefleId = (trefleId) =>
  new Promise((resolve, reject) => {
    Plant.findOne({ where: { id_trefle: trefleId }, rejectOnEmpty: true })
      .then((plant) => {
        console.log(plant);
        resolve(plant.id);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  createPlant,
  findPlantByTrefleId,
  createPlantWithSelfData,
};
