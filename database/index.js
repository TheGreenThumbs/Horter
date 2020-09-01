const Sequelize = require("sequelize");
const factories = require("./models");
require("dotenv").config();

const { gardenFactory, plantFactory, plantInGardenFactory } = factories;

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "horter";
const dbUser = process.env.DB_USER || "postgres";
const dbPass = process.env.DB_PASS || "postgres";

// The Database connection, if you want to see SQL queries turn logging to true
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  logging: false,
  host: dbHost,
  dialect: "postgres",
});

// Setup all the models with their factory functions
const models = {
  Garden: gardenFactory(sequelize),
  Plant: plantFactory(sequelize),
  PlantInGarden: plantInGardenFactory(sequelize),
};

// A function that sets up all the model associations, so we can drop the database
//  while testing and then just call this function to reset all the associations
const associations = () => {
  models.Garden.hasMany(models.PlantInGarden, { as: "plants" });
  models.PlantInGarden.belongsTo(models.Garden);
};
associations();

module.exports = {
  models,
  sequelize,
  associations,
};
