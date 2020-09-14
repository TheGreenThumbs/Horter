const Sequelize = require("sequelize");
const factories = require("./models");
require("dotenv").config();

const {
  gardenFactory,
  plantFactory,
  plantInGardenFactory,
  wishListFactory,
  userFactory,
  friendFactory,
  sessionFactory,
} = factories;

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || process.env.TEST_DB || "horter";
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
  User: userFactory(sequelize),
  WishList: wishListFactory(sequelize),
  Friend: friendFactory(sequelize),
  Session: sessionFactory(sequelize),
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
  models.User.hasMany(models.WishList);
  models.WishList.belongsTo(models.User);
  models.Garden.belongsTo(models.User);
  models.User.hasMany(models.Garden);
  models.User.hasMany(models.Friend);
  models.Friend.belongsTo(models.User, {
    as: "friends",
    foreignKey: "id_friend",
  });
  models.User.hasMany(models.Friend);
  models.Friend.belongsTo(models.User, {
    as: "user",
    foreignKey: "id_user",
  });
};
associations();

module.exports = {
  models,
  sequelize,
  associations,
};
