const { models } = require("../database");

const { Garden, PlantInGarden } = models;

/**
 * Fills the database with dummy data
 */
const fillDatabaseWithDummyData = () =>
  new Promise((resolve, reject) => {
    Garden.create({
      name: "Max Garden",
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
          width: 15,
          length: 15,
          lat: -90,
          lng: 29,
          photo:
            "https://www.bhgre.com/bhgrelife/wp-content/uploads/2016/06/SmallGardens_featuredimage.png",
          zone: 5,
        })
      )
      .then(() =>
        PlantInGarden.create({
          position_x: 1,
          position_y: 1,
          radius: 1,
          gardenId: 1,
        })
      )
      .then(() =>
        PlantInGarden.create({
          position_x: 1,
          position_y: 1,
          radius: 1,
          gardenId: 1,
        })
      )
      .then(() =>
        PlantInGarden.create({
          position_x: 1,
          position_y: 1,
          radius: 1,
          gardenId: 2,
        })
      )
      .then(() => resolve("success"))
      .catch((err) => {
        reject(err);
      });
  });

module.exports = fillDatabaseWithDummyData;
