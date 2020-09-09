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
    let duration;
    if (data.duration !== null) {
      /* eslint-disable prefer-destructuring */
      duration = data.duration[0];
    } else {
      duration = null;
    }
    const newPlant = {
      id_trefle: data.id,
      slug: data.slug,
      common_name: data.common_name,
      scientific_name: data.scientific_name,
      photo_url: data.image_url,
      duration,
      edible: data.edible,
      vegetable: data.vegetable,
      light: data.growth.light,
      ph_min: data.growth.ph_minimum,
      ph_max: data.growth.ph_maximum,
      temp_min: data.growth.minimum_temperature.deg_f,
      temp_max: data.growth.maximum_temperature.deg_f,
      precipitation_min: data.growth.minimum_precipitation.mm,
      precipitation_max: data.growth.maximum_precipitation.mm,
      soil_nutriments: data.growth.soil_nutriments,
      soil_salinity: data.growth.soil_salinity,
      soil_texture: data.growth.soil_texture,
      soil_humidity: data.growth.soil_humidity,
    };
    // delete newPlant.id;
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
