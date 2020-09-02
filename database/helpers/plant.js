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

module.exports = {
  createPlant,
};
