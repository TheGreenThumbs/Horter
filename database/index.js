const Sequelize = require("sequelize");
const factories = require("./models");
require("dotenv").config();

const {
  gardenFactory,
  plantFactory,
  plantInGardenFactory,
  wishListFactory,
} = factories;

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "horter";
const dbUser = process.env.DB_USER || "postgres";
const dbPass = process.env.DB_PASS || "";

const dbOptions =
  process.env.NODE_ENV === "development"
    ? {
        logging: false,
        host: dbHost,
        dialect: "postgres",
      }
    : {
        logging: false,
        host: dbHost,
        dialect: "postgres",
        port: process.env.DB_PORT,
      };

// The Database connection, if you want to see SQL queries turn logging to true
const sequelize = new Sequelize(dbName, dbUser, dbPass, dbOptions);

// Setup all the models with their factory functions
const models = {
  Garden: gardenFactory(sequelize),
  Plant: plantFactory(sequelize),
  PlantInGarden: plantInGardenFactory(sequelize),
  WishList: wishListFactory(sequelize),
};

// A function that sets up all the model associations, so we can drop the database
//  while testing and then just call this function to reset all the associations
const associations = () => {
  models.Garden.hasMany(models.PlantInGarden, { as: "plants" });
  models.PlantInGarden.belongsTo(models.Garden);
  models.Plant.hasMany(models.PlantInGarden, { as: "plants" });
  models.PlantInGarden.belongsTo(models.Plant);
  models.Plant.hasMany(models.WishList);
  models.WishList.belongsTo(models.Plant, { as: "plant" });
};
associations();

module.exports = {
  models,
  sequelize,
  associations,
};
