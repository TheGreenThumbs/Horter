const { models, associations } = require("../database");

const { Garden, Plant } = models;

/**
 * Fills the database with dummy data
 */
const fillDatabaseWithDummyData = () =>
  new Promise((resolve, reject) => {
    associations();
    Garden.create({
      name: "Max Garden",
      id_use: 1,
      width: 15,
      length: 15,
      lat: -90,
      lng: 29,
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-small-garden-ideas-1524680753.jpg",
      zone: 5,
    })
      .then(() =>
        Garden.create({
          name: "Jaz Garden",
          id_use: 2,
          width: 15,
          length: 15,
          lat: -90,
          lng: 29,
          photo: "https://i.ytimg.com/vi/z5IcJrZI5Yc/sddefault.jpg",
          zone: 5,
        })
      )
      .then(() =>
        Garden.create({
          name: "Lorie Garden",
          id_use: 3,
          width: 15,
          length: 15,
          lat: -90,
          lng: 29,
          photo:
            "https://theplantgallery.com/wp-content/uploads/2019/07/DSC00080-1.jpg",
          zone: 5,
        })
      )
      .then(() =>
        Garden.create({
          name: "Daniel Garden",
          id_use: 4,
          width: 15,
          length: 15,
          lat: -90,
          lng: 29,
          photo:
            "https://www.bhgre.com/bhgrelife/wp-content/uploads/2016/06/SmallGardens_featuredimage.png",
          zone: 5,
        })
      )
      .then(() => {
        Plant.create({
          id_trefle: 190734,
          slug: "vaccinium-angustifolium",
          common_name: "lowbush blueberry",
          scientific_name: "Vaccinium angustifolium",
          photo_url:
            "https://bs.floristic.org/image/o/47e11be2f432571d481550ab8d3e6fc7b9290d3b",
          duration: null,
          edible: true,
          vegetable: false,
          light: null,
          ph_min: 4.7,
          ph_max: 7.5,
          temp_min: -33,
          temp_max: null,
          precipitation_min: 812,
          precipitation_max: 1270,
          soil_nutriments: null,
          soil_salinity: null,
          soil_texture: null,
          soil_humidity: null,
        });
      })
      .then(() => resolve("success"))
      .catch((err) => {
        reject(err);
      });
  });

module.exports = fillDatabaseWithDummyData;
