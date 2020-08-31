const { models, associations } = require("../database");

const { Garden } = models;

/**
 * Fills the database with dummy data
 */
const fillDatabaseWithDummyData = async () => {
  associations();
  await Garden.create({
    name: "Max Garden",
    id_use: 1,
    width: 15,
    length: 15,
    lat: -90,
    lng: 29,
    photo:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-small-garden-ideas-1524680753.jpg",
    zone: 5,
  });
  await Garden.create({
    name: "Jaz Garden",
    id_use: 2,
    width: 15,
    length: 15,
    lat: -90,
    lng: 29,
    photo: "https://i.ytimg.com/vi/z5IcJrZI5Yc/sddefault.jpg",
    zone: 5,
  });
  await Garden.create({
    name: "Lorie Garden",
    id_use: 3,
    width: 15,
    length: 15,
    lat: -90,
    lng: 29,
    photo:
      "https://theplantgallery.com/wp-content/uploads/2019/07/DSC00080-1.jpg",
    zone: 5,
  });
  await Garden.create({
    name: "Daniel Garden",
    id_use: 4,
    width: 15,
    length: 15,
    lat: -90,
    lng: 29,
    photo:
      "https://www.bhgre.com/bhgrelife/wp-content/uploads/2016/06/SmallGardens_featuredimage.png",
    zone: 5,
  });
};

module.exports = fillDatabaseWithDummyData;
