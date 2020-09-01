const { models, associations } = require("../database");

const { Garden } = models;

/**
 * Fills the database with dummy data
 */
const fillDatabaseWithDummyData = () =>
  new Promise((resolve, reject) => {
    let gardenToAddTo;
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
      .then((garden) => {
        gardenToAddTo = garden;
        return gardenToAddTo.createPlantInGarden({
          position_x: 1,
          position_y: 1,
          radius: 1,
        });
      })
      .then(() =>
        gardenToAddTo.createPlantInGarden({
          position_x: 1,
          position_y: 1,
          radius: 1,
        })
      )
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
      .then(() => resolve("success"))
      .catch((err) => {
        reject(err);
      });
  });

module.exports = fillDatabaseWithDummyData;
