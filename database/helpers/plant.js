const { models } = require("../index");

const { Plant } = models;

const createPlant = (info) =>
  new Promise((resolve, reject) => {
    Plant.create({ info })
      .then((plant) => {
        resolve(plant);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  createPlant,
};
