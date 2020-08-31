const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

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

const models = {};

// A function that sets up all the model associations, so we can drop the database
//  while testing and then just call this function to reset all the associations
const associations = () => {};
associations();

module.exports = {
  models,
  sequelize,
  associations,
};
